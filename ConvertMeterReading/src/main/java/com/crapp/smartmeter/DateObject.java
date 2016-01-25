package com.crapp.smartmeter;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;

/**
 * Created by efo20922 on 15-1-2016.
 */
@XmlRootElement
public class DateObject {

    public Date date;

    public DateObject(){

    }

    public DateObject(Date date){
        this.date = date;
    }
}

