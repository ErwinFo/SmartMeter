package com.crapp.smartmeter;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;

/**
 * Created by efo20922 on 25-1-2016.
 */

@XmlRootElement
public class PricePerPeriod {

    public PricePerPeriod(){

    }

    public PricePerPeriod(int id,
                            Date start,
                            Date end,
                            String providerName,
                            float priceElectricPeak,
                            float priceElectricOffPeak,
                            float priceGas){

        this.id						= id;
        this.start					= start;
        this.end                    = end;
        this.providerName			= providerName;
        this.priceElectricPeak		= priceElectricPeak;
        this.priceElectricOffPeak	= priceElectricOffPeak;
        this.priceGas				= priceGas;

    }

    public int id;
    public Date start;
    public Date end;
    public String providerName;
    public float priceElectricPeak;
    public float priceElectricOffPeak;
    public float priceGas;


}
