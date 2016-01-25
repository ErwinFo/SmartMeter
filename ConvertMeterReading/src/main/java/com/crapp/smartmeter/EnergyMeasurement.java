package com.crapp.smartmeter;/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import java.util.Date;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author edwin
 */
@XmlRootElement
public class EnergyMeasurement {

    /*
    1)dateElectric, 2)deviceElectric, 3)meter181kWh, 4)meter281kWh, 5)meter182kWh, 6)meter282kWh, 7)tarif, 8)powerDeliveredkw
    9)powerReceivedKw, 10)powerFailuresKw, 11)longPowerFailures, 12)deviceGas, 13)dateGas 14)gasMeasurement
    */
    public EnergyMeasurement(){

    }

    public EnergyMeasurement(int id,
                             Date date,
                             Date time,
                             Date dateElectric,
                             String deviceElectric,
                             float meter181kWh,
                             float meter281kWh,
                             float meter182kWh,
                             float meter282kWh,
                             String tarif,
                             float powerDeliveredKw,
                             float powerReceivedKw,
                             int powerFailures,
                             int longPowerFailures,
                             String deviceGas,
                             Date dateGas,
                             float gasMeasurementm3
                             ) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.dateElectric = dateElectric;
        this.deviceElectric = deviceElectric;
        this.meter181kWh = meter181kWh;
        this.meter281kWh = meter281kWh;
        this.meter182kWh = meter182kWh;
        this.meter282kWh = meter282kWh;
        this.tarif = tarif;
        this.powerDeliveredKw = powerDeliveredKw;
        this.powerReceivedKw = powerReceivedKw;
        this.powerFailures = powerFailures;
        this.longPowerFailures = longPowerFailures;
        this.deviceGas = deviceGas;
        this.dateGas = dateGas;
        this.gasMeasurementm3 = gasMeasurementm3;
    }

    public int id;
    public Date date;
    public Date time;
    public Date dateElectric;           // 0-0:1.0.0
    public String deviceElectric;       // 0-0:96.1.1
    public float meter181kWh;              // 1-0:1.8.1
    public float meter281kWh;              // 1-0:2.8.1
    public float meter182kWh;              // 1-0:1.8.2
    public float meter282kWh;              // 1-0:2.8.2
    public String tarif;                // 0-0:96.14.0
    public float powerDeliveredKw;        // 1-0:1.7.0
    public float powerReceivedKw;         // 1-0:2.7.0
    public int powerFailures;           // 0-0:96.7.21
    public int longPowerFailures;       // 0-0:96.7.9
    public String deviceGas;            // 0-1:96.1.0
    public Date dateGas;                // 0-1:24.2.1
    public float gasMeasurementm3;        // 0-1:24.2.1

}
