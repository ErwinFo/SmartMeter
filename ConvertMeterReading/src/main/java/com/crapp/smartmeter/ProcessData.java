package com.crapp.smartmeter;

import gnu.io.CommPort;
import gnu.io.CommPortIdentifier;
import gnu.io.PortInUseException;
import gnu.io.SerialPort;

import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Scanner;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


/**
 * Created by efo20922 on 4-1-2016.
 */
public class ProcessData {

    MeasurementsDataBase store = MeasurementsDataBase.getInstance();

    public ProcessData() {
        System.out.println("ProcessData");
    }

    public void connect(String portName) throws Exception {
        System.out.println("connect on usb" + portName);

        CommPortIdentifier portIdentifier = CommPortIdentifier.getPortIdentifier(portName);

        if (portIdentifier.isCurrentlyOwned()) {
            System.out.println("Error: Port is currently in use");
        } else {

            int timeout = 2000;
            while (1 != 0) {

                try {
                    CommPort commPort = portIdentifier.open(this.getClass().getName(), timeout);
                    if (commPort instanceof SerialPort) {
                        SerialPort serialPort = (SerialPort) commPort;

                        /*
                        The interface will use a fixed transfer speed of 115200 baud. For character formatting a start
                        bit, 8 data bits, no parity bit and a stop bit are used (8N1).Note this is not conforming to
                        ENIEC62056-21 Mode D.
                         */
                        serialPort.setSerialPortParams(115200,
                                SerialPort.DATABITS_8,
                                SerialPort.STOPBITS_1,
                                SerialPort.PARITY_NONE);

                        InputStream in = serialPort.getInputStream();

                        Calendar calendar = Calendar.getInstance();
                        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
                        scheduler.scheduleAtFixedRate(new SerialReader(in, commPort),
                                millisToNextHour(calendar), 60 * 60 * 1000, TimeUnit.MILLISECONDS);

                        //Thread myThread = new Thread(new SerialReader(in, commPort));
                        //myThread.start();
                    } else {
                        System.out.println("Error: Only serial ports are handled by this example.");
                    }
                } catch (PortInUseException ex) {
                    System.out.println("PortInUseException , lets wait for another turn");
                }

                Thread.sleep(1800000);
            }
        }
    }

    private static long millisToNextHour(Calendar calendar) {
        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        int minutes = calendar.get(Calendar.MINUTE);
        int seconds = calendar.get(Calendar.SECOND);
        int millis = calendar.get(Calendar.MILLISECOND);
        int minutesToNextHour = 60 - minutes - 1;
        int secondsToNextHour = 60 - seconds - 1;
        int millisToNextHour = 1000 - millis;

        System.out.println("Now: " + hour + ":" +minutes + ":" + seconds);
        System.out.println("Fire in: " + minutesToNextHour + ":" + secondsToNextHour + " minutes");

        return minutesToNextHour*60*1000 + secondsToNextHour*1000 + millisToNextHour;
    }

    private class SerialReader implements Runnable {

        InputStream in;
        CommPort commPort;

        public SerialReader(InputStream in, CommPort commPort) {
            this.in = in;
            this.commPort = commPort;
        }

        public void run() {
            System.out.println("start new thread on " + new Date());
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            String line;
            StringBuffer buf = new StringBuffer();

            // continue processing
            try {
                while ((line = br.readLine()) != null) {
                    buf.append(line).append(System.lineSeparator());

                    if (line.startsWith("!")) {

                        processSmartMeter(buf.toString());

                        in.close();
                        commPort.close();
                        System.out.println("return thread");
                        return;
                    }
                }
            } catch (Exception ex) {
                System.out.println(ex.toString());
                Thread.currentThread().interrupt();
            }
        }
    }

    /*
    Exceptions
    java.lang.NumberFormatException: For input string: "001477.458*?1-0:2.8.1(000000.000"
    str = str.replaceAll("\\D+","");
    1-0:1.8.1(001434.912*kWh)
    1-0:2.8.1(000000.000*kWh)
    */
    public void processSmartMeter(String result) throws Exception {

        Scanner scanner = new Scanner(result);

        // --== ONLY USE FOR TEST START ==--
        // FileReader fileReader = new FileReader(new File("messages_long.txt"));
        // BufferedReader br = new BufferedReader(fileReader);
        // --== ONLY USE FOR TEST END   ==--

        Date dateElectric = new Date();
        String deviceElectric = "";
        Float meter181 = 0f;
        Float meter281 = 0f;
        Float meter182 = 0f;
        Float meter282 = 0f;
        Integer tarif = 0;
        Float powerDeliveredKw = 0f;
        Float powerReceivedKw = 0f;
        Integer powerFailures = 0;
        Integer longPowerFailures = 0;
        String deviceGas = "";
        Date dateGas = new Date();
        Float gasMeasurement = 0f;

        // String line;
        // while ((line = br.readLine()) != null) {
            while (scanner.hasNextLine()) { // for testing

            String replace = "[\\s()*kWh?]";
            try {
                String line = scanner.nextLine().trim();
                if (line.startsWith("0-0:1.0.0")) {
                    line = line.replace("0-0:1.0.0", "");
                    line = line.replaceAll(replace, "");
                    dateElectric = new SimpleDateFormat("yyMMddhhmmss", Locale.ENGLISH).parse(line);

                    // Equipment identifier
                } else if (line.startsWith("0-0:96.1.1")) {
                    line = line.replace("0-0:96.1.1", "");
                    line = line.replaceAll(replace, "");
                    deviceElectric = line.substring(0, 34);

                    // Meter Reading electricity delivered to client (Tariff 1)
                } else if (line.startsWith("1-0:1.8.1")) {
                    line = line.replace("1-0:1.8.1", "");
                    line = line.replaceAll(replace, "");
                    meter181 = Float.valueOf(line.substring(0, 10));

                } else if (line.startsWith("1-0:2.8.1")) {
                    line = line.replace("1-0:2.8.1", "");
                    line = line.replaceAll(replace, "");
                    meter281 = Float.valueOf(line.substring(0, 10));

                    // Meter Reading electricity delivered by client (Tariff 2)
                } else if (line.startsWith("1-0:1.8.2")) {
                    line = line.replace("1-0:1.8.2", "");
                    line = line.replaceAll(replace, "");
                    meter182 = Float.valueOf(line.substring(0, 10));

                    // Meter Reading electricity delivered by client (Tariff 2)
                } else if (line.startsWith("1-0:2.8.2")) {
                    line = line.replace("1-0:2.8.2", "");
                    line = line.replaceAll(replace, "");
                    meter282 = Float.valueOf(line.substring(0, 10));

                    //Tariff indicator electricity. The tariff indicator can be used to switch tariff dependent loads e.g boilers.
                    // This is responsibility of the P1 user
                } else if (line.startsWith("0-0:96.14.0")) {
                    line = line.replace("0-0:96.14.0", "");
                    line = line.replaceAll(replace, "");
                    tarif = Integer.valueOf(line.substring(0, 4));

                    // Actual electricity power delivered (+P) in 1 Watt resolution
                } else if (line.startsWith("1-0:1.7.0")) {
                    line = line.replace("1-0:1.7.0", "");
                    line = line.replaceAll(replace, "");
                    powerDeliveredKw = (Float.valueOf(line.substring(0, 6)) * 1000);

                    // Actual electricity power received (-P) in 1 Watt resolution
                } else if (line.startsWith("1-0:2.7.0")) {
                    line = line.replace("1-0:2.7.0", "");
                    line = line.replaceAll(replace, "");
                    powerReceivedKw = (Float.valueOf(line.substring(0, 6)) * 1000);

                    // Number of power failures in any phases
                } else if (line.startsWith("0-0:96.7.21")) {
                    line = line.replace("0-0:96.7.21", "");
                    line = line.replaceAll(replace, "");
                    powerFailures = Integer.valueOf(line.substring(0, 5));

                    // Number of long power failures in any phases
                } else if (line.startsWith("0-0:96.7.9")) {
                    line = line.replace("0-0:96.7.9", "");
                    line = line.replaceAll(replace, "");
                    longPowerFailures = Integer.valueOf(line.substring(0, 5));

                    // Equipment identifier
                } else if (line.startsWith("0-1:96.1.0")) {
                    line = line.replace("0-1:96.1.0", "");
                    line = line.replaceAll(replace, "");
                    deviceGas = line.substring(0, 34);

                    // Gas measurement
                } else if (line.startsWith("0-1:24.2.1")) {
                    line = line.replace("0-1:24.2.1", "");
                    line = line.replaceAll(replace, "");

                    String dateString = line.substring(0, 12);
                    dateGas = new SimpleDateFormat("yyMMddhhmmss", Locale.ENGLISH).parse(dateString);
                    line = line.replace(dateString, "");

                    gasMeasurement = Float.valueOf(line.substring(0,9));
                }

            } catch (NumberFormatException nfe) {
                System.out.println(nfe.toString() + "\n");
                nfe.printStackTrace();
            } catch (ParseException pe) {
                System.out.println(pe.toString() + "\n");
                pe.printStackTrace();
            } catch (Exception e) {
                System.out.println(e.toString() + "\n");
                e.printStackTrace();
            }
        }

        //        System.out.println(
        //                "Date Electric: " + dateElectric + "\n" +
        //                        "Device ID Electric: " + deviceElectric + "\n" +
        //                        "Meter181: " + meter181 + "\n" +
        //                        "Meter281: " + meter281 + "\n" +
        //                        "Meter182: " + meter182 + "\n" +
        //                        "Meter281: " + meter282 + "\n" +
        //                        "Tarif: " + tarif + "\n" +
        //                        "Power Deliverd: " + powerDeliveredKw + "\n" +
        //                        "Power Received: " + powerReceivedKw + "\n" +
        //                        "Power Failures: " + powerFailures + "\n" +
        //                        "Long Power Failures: " + longPowerFailures + "\n" +
        //                        "Device ID Gas: " + deviceGas + "\n" +
        //                        "Date Gas: " + dateGas + "\n" +
        //                        "Gas Measurement: " + gasMeasurement);

        store.addEnergyMeasurement(
                dateElectric, deviceElectric,
                meter181, meter281, meter182, meter282,
                tarif, powerDeliveredKw, powerReceivedKw,
                powerFailures, longPowerFailures, deviceGas, dateGas,
                gasMeasurement);


    }

    public static void main(String[] args) {

        try {
            (new ProcessData()).connect("/dev/ttyUSB1");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

