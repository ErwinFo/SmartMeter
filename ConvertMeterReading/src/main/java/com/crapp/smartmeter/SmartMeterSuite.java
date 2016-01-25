package com.crapp.smartmeter;/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import com.sun.jersey.api.json.JSONWithPadding;

import java.util.Date;
import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author edwin
 */
@Path("/")
public class SmartMeterSuite {

    public SmartMeterSuite() {
        System.out.println("SmartMeterSuite");
    }
    public static final String MESSAGE = "This is the SmartMeter application";

    MeasurementsDataBase store = MeasurementsDataBase.getInstance();

    @GET
    @Produces({MediaType.TEXT_HTML})
    public String getText() {
        return MESSAGE;
    }


    @GET
    @Path("listEnergy/{date}")
    @Produces({ "application/x-javascript",MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public JSONWithPadding getEnergyList(@PathParam("date") DateParam day,
                                                 @QueryParam("callback") String callback) {
        System.out.println("callback id: " + callback);
        if (null == callback) {
            return new JSONWithPadding(new GenericEntity<List<EnergyMeasurement>>(store.listEnergyMeasurement(day.getDate())) {
            });
        } else {
            return new JSONWithPadding(new GenericEntity<List<EnergyMeasurement>>(store.listEnergyMeasurement(day.getDate())) {
            }, callback);
        }
    }

    @GET
    @Path("listOfDates")
    @Produces({ "application/x-javascript",MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public JSONWithPadding getDateList(@QueryParam("callback") String callback) {
        System.out.println("callback id: " + callback);
        System.out.println("Date 0:" + store.listOfDates().get(0));
        if (null == callback) {
            return new JSONWithPadding(new GenericEntity<List<DateObject>>(store.listOfDates()) {
            });
        } else {
            return new JSONWithPadding(new GenericEntity<List<DateObject>>(store.listOfDates()) {
            }, callback);
        }
    }

    @GET
    @Path("test/{date}")
    @Produces({ "application/x-javascript",MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public JSONWithPadding getTest(@PathParam("date") DateParam day,
                                         @QueryParam("callback") String callback) {
        System.out.println("callback id: " + callback);

        return new JSONWithPadding(day);
    }

    @GET
    @Path("deleteDatabase")
    @Produces({MediaType.TEXT_HTML})
    public String deleteDatabase() {
        store.deleteMeasurements();
        return "deleted all records";
    }
}
