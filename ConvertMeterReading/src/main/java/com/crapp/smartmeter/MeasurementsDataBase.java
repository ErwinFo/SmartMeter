package com.crapp.smartmeter;

import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by erwinfoekema on 08/01/16.
 */
public class MeasurementsDataBase {

    private final static String DB_DRIVER = "org.apache.derby.jdbc.EmbeddedDriver";
    private final static String DB_NAME = "smartmeter";
    private final static String DB_URL = String.format("jdbc:derby:%s", DB_NAME);
    // Boot password must be at least 8 bytes long.
    private final static String DB_KEY = "12345678";
    private static MeasurementsDataBase instance;
    private Connection connection;
    private Statement statement;

    final static long DAY_MILLIS = 86400000;

    private MeasurementsDataBase() {
        try {
            Class.forName(DB_DRIVER);
            connection = DriverManager.getConnection(DB_URL + ";create=true;dataEncryption=false;bootPassword=" + DB_KEY, null);
            statement = connection.createStatement();

            System.out.println("connection made");

        } catch (ClassNotFoundException cnfe) {
            System.out.println("Please put derby.jar in the classpath");
            System.exit(1);
        } catch (SQLException sqe) {
            sqe.printStackTrace();
        }
        /*
            1)dateElectric, 2)deviceElectric, 3)meter181, 4)meter281, 5)meter182, 6)meter282, 7)tarif, 8)powerDelivered
            9)powerReceived, 10)powerFailures, 11)longPowerFailures, 12)deviceGas, 13)dateGas 14)gasMeasurement
        */
        try {
            statement.execute(
                    "CREATE TABLE measurements"
                            + "( id                 INTEGER         NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1) CONSTRAINT DEVICE_PK PRIMARY KEY"
                            + ", date               DATE            NOT NULL"
                            + ", time               TIMESTAMP       NOT NULL"
                            + ", dateElectric       DATE            NOT NULL"
                            + ", deviceElectric     VARCHAR(100)	NOT NULL"
                            + ", meter181kWh        NUMERIC(8,3)"
                            + ", meter281kWh        NUMERIC(8,3)"
                            + ", meter182kWh        NUMERIC(8,3)"
                            + ", meter282kWh        NUMERIC(8,3)"
                            + ", tarif              VARCHAR(100)"
                            + ", powerDeliveredKw   NUMERIC(5,0)"
                            + ", powerReceivedKw    NUMERIC(5,0)"
                            + ", powerFailures      VARCHAR(100)"
                            + ", longPowerFailures  VARCHAR(100)"
                            + ", deviceGas          VARCHAR(100)	NOT NULL"
                            + ", dateGas            DATE            NOT NULL"
                            + ", gasMeasurementm3   NUMERIC(8,3)"
                            + ")");
        } catch (SQLException ignored) {

        }

        try {
            statement.execute(
                    "CREATE TABLE price_per_period"
                            + "( id                     INTEGER         NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1) CONSTRAINT DEVICE_PK PRIMARY KEY"
                            + ", start                  DATE            NOT NULL"
                            + ", end                    DATE            NOT NULL"
                            + ", provider_name          VARCHAR(100)	NOT NULL"
                            + ", priceElectricPeak      NUMERIC(8,3)"
                            + ", priceElectricOffPeak   NUMERIC(8,3)"
                            + ")");
        } catch (SQLException ignored) {

        }
    }

    public static synchronized MeasurementsDataBase getInstance() {
        if (instance == null) {
            instance = new MeasurementsDataBase();
        }
        System.out.println("return instance");

        return instance;
    }

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
        // cleanup
        System.out.println("connection finalize");

        try {
            if (statement != null) {
                statement.close();
            }
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException se) {
            se.printStackTrace();
        }
        // shutdown the database
        try {
            DriverManager.getConnection(DB_URL + ";shutdown=true");
        } catch (SQLException se) {
            if (!se.getSQLState().equals("08006")) {
                se.printStackTrace();
            }
            // otherwise ignore it : this is expected
        }
    }

    /*
        0)ID 1)new Date() 2) DateTime 3)dateElectric, 2)deviceElectric, 3)meter181, 4)meter281, 5)meter182, 6)meter282, 7)tarif, 8)powerDelivered
        9)powerReceived, 10)powerFailures, 11)longPowerFailures, 12)deviceGas, 13)dateGas 14)gasMeasurement
    */
    public void addEnergyMeasurement(Date dateElectric, String deviceElectric,
                                     float meter181, float meter281, float meter182, float meter282,
                                     Integer tarif, float powerDelivered, float powerReceived,
                                     int powerFailures, int longPowerFailures, String deviceGas, Date dateGas,
                                     float gasMeasurement) {
        try {

            String insert = "INSERT INTO measurements " +
                    "( date" +              // 1
                    ", time" +              // 2
                    ", dateElectric" +      // 3
                    ", deviceElectric" +    // 4
                    ", meter181kWh" +       // 5
                    ", meter281kWh" +       // 6
                    ", meter182kWh" +       // 7
                    ", meter282kWh" +       // 8
                    ", tarif" +             // 9
                    ", powerDeliveredKw" +  // 10
                    ", powerReceivedKw" +   // 11
                    ", powerFailures" +     // 12
                    ", longPowerFailures" + // 13
                    ", deviceGas" +         // 14
                    ", dateGas" +           // 15
                    ", gasMeasurementm3)"   // 16
                    + " VALUES (" +         // VALUES
                    " CURRENT_DATE" +       //
                    ",CURRENT_TIMESTAMP" +  //
                    ",?" +                  // 1
                    ",?" +                  // 2
                    ",?" +                  // 3
                    ",?" +                  // 4
                    ",?" +                  // 5
                    ",?" +                  // 6
                    ",?" +                  // 7
                    ",?" +                  // 8
                    ",?" +                  // 9
                    ",?" +                  // 10
                    ",?" +                  // 11
                    ",?" +                  // 12
                    ",?" +                  // 13
                    ",?)";                  // 14

            PreparedStatement pstmt = connection.prepareStatement(insert);

            pstmt.setDate(1, new java.sql.Date(dateElectric.getTime()));
            pstmt.setString(2, deviceElectric);
            pstmt.setFloat(3, meter181);
            pstmt.setFloat(4, meter281);
            pstmt.setFloat(5, meter182);
            pstmt.setFloat(6, meter282);
            pstmt.setInt(7, tarif);
            pstmt.setFloat(8, powerDelivered);
            pstmt.setFloat(9, powerReceived);
            pstmt.setInt(10, powerFailures);
            pstmt.setInt(11, longPowerFailures);
            pstmt.setString(12, deviceGas);
            pstmt.setDate(13, new java.sql.Date(dateGas.getTime()));
            pstmt.setFloat(14, gasMeasurement);

            pstmt.executeUpdate();

        } catch (SQLException se) {
            se.printStackTrace();
        }
    }

    /*
        1)dateElectric, 2)deviceElectric, 3)meter181, 4)meter281, 5)meter182, 6)meter282, 7)tarif, 8)powerDelivered
        9)powerReceived, 10)powerFailures, 11)longPowerFailures, 12)deviceGas, 13)dateGas 14)gasMeasurement
    */
    public List<EnergyMeasurement> listEnergyMeasurement(Date day) {

        System.out.println("EnergyMeasurement for day: " + day);

        if (day == null) {
            return null;
        }

        ResultSet resultset = null;
        ArrayList<EnergyMeasurement> list = new ArrayList<EnergyMeasurement>();

        try {
            String select =
                    " SELECT * FROM measurements WHERE date = ? ";

            PreparedStatement pstmt = connection.prepareStatement(select);
            pstmt.setDate(1, new java.sql.Date(day.getTime()));
            resultset = pstmt.executeQuery();

            while (resultset.next()) {
                list.add(new EnergyMeasurement(
                        resultset.getInt(1),
                        resultset.getDate(2),
                        resultset.getTimestamp(3),
                        resultset.getDate(4),
                        resultset.getString(5),
                        resultset.getFloat(6),
                        resultset.getFloat(7),
                        resultset.getFloat(8),
                        resultset.getFloat(9),
                        resultset.getString(10),
                        resultset.getFloat(11),
                        resultset.getFloat(12),
                        resultset.getInt(13),
                        resultset.getInt(14),
                        resultset.getString(15),
                        resultset.getDate(16),
                        resultset.getFloat(17)
                ));
            }
        } catch (SQLException se) {
            se.printStackTrace();
        } finally {
            try {
                if (resultset != null) {
                    resultset.close();
                }
            } catch (SQLException ignored) {
            }
        }

        return list;
    }

    public List<DateObject> listOfDates() {

        ResultSet resultset = null;
        ArrayList<DateObject> list = new ArrayList<DateObject>();

        try {
            resultset = statement.executeQuery("SELECT DISTINCT date FROM measurements");

            while (resultset.next()) {

                System.out.println("Added result from query" + resultset.getDate(1));

                list.add(new DateObject(
                        resultset.getDate(1)));
            }
        } catch (SQLException se) {
            se.printStackTrace();
        } finally {
            try {
                if (resultset != null) {
                    resultset.close();
                }
            } catch (SQLException ignored) {
            }
        }
        return list;
    }

    public void addPricePerPeriod(Date start,
                                  Date end,
                                  String providerName,
                                  float priceElectricPeak,
                                  float priceElectricOffPeak,
                                  float priceGas) {
        try {

            String insert = "INSERT INTO price_per_period " +
                    "( start" +                 // 1
                    ", end" +                   // 2
                    ", providerName" +          // 3
                    ", priceElectricPeak" +     // 4
                    ", priceElectricOffPeak" +  // 5
                    ", priceGas" +              // 6
                    ",?" +                      // 1
                    ",?" +                      // 2
                    ",?" +                      // 3
                    ",?" +                      // 4
                    ",?" +                      // 5
                    ",?)";                      // 6

            PreparedStatement pstmt = connection.prepareStatement(insert);

            pstmt.setDate(1, new java.sql.Date(start.getTime()));
            pstmt.setDate(2, new java.sql.Date(end.getTime()));
            pstmt.setString(3, providerName);
            pstmt.setFloat(4, priceElectricPeak);
            pstmt.setFloat(5, priceElectricOffPeak);
            pstmt.setFloat(6, priceGas);

            pstmt.executeUpdate();

        } catch (SQLException se) {
            se.printStackTrace();
        }
    }

    /**
     * Used in SmartMeterSuite to provide a list with prices for periods
     * @return list with periods and prices for those periods
     */
    public List<PricePerPeriod> getPricesPerPeriod() {

        System.out.println("getPricesPerPeriod");

        ResultSet resultset = null;
        ArrayList<PricePerPeriod> list = new ArrayList<PricePerPeriod>();

        try {
            String select =
                    " SELECT * FROM prices_per_period";

            PreparedStatement pstmt = connection.prepareStatement(select);

            resultset = pstmt.executeQuery();

            while (resultset.next()) {
                list.add(new PricePerPeriod(
                        resultset.getInt(1),
                        resultset.getDate(2),
                        resultset.getDate(3),
                        resultset.getString(4),
                        resultset.getFloat(5),
                        resultset.getFloat(6),
                        resultset.getFloat(7)
                ));
            }
        } catch (SQLException se) {
            se.printStackTrace();
        } finally {
            try {
                if (resultset != null) {
                    resultset.close();
                }
            } catch (SQLException ignored) {
            }
        }

        return list;
    }

    public void deleteMeasurements() {
        try {
            statement.execute("DELETE FROM measurements");
        } catch (SQLException se) {
            se.printStackTrace();
        }

    }
}
