package com.crapp.smartmeter;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import com.sun.jersey.api.json.JSONWithPadding;

import java.sql.Date;
import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
    @Path("deleteDatabase")
    @Produces({MediaType.TEXT_HTML})
    public String deleteDatabase() {
        store.deleteMeasurements();
        return "deleted all records";
    }

    @POST
    @Path("addPricePeriod/{start}/{end}/{providerName}/{priceElectricPeak}/{priceElectricOffPeak}/{priceGas}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response addPricePeriod(@FormParam("start") Date start,
                                   @FormParam("end") Date end,
                                   @FormParam("providerName") String providerName,
                                   @FormParam("priceElectricPeak") float priceElectricPeak,
                                   @FormParam("priceElectricOffPeak") float priceElectricOffPeak,
                                   @FormParam("priceGas") float priceGas) {

        // System.out.println("");

        store.addPricePerPeriod(start,end,providerName,priceElectricPeak,priceElectricOffPeak,priceGas);

        return Response.ok("Data=" + start + " " + end + " " + providerName).build();
    }

    @GET
    @Path("getPricePeriod")
    @Produces({"application/x-javascript",MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public JSONWithPadding getPricePeriod(@QueryParam("callback") String callback) {
        System.out.println("callback id: " + callback);
        System.out.println("Date 0:" + store.listOfDates().get(0));

        if (null == callback) {
            return new JSONWithPadding(new GenericEntity<List<PricePerPeriod>>(store.getPricesPerPeriod()) {
            });
        } else {
            return new JSONWithPadding(new GenericEntity<List<PricePerPeriod>>(store.getPricesPerPeriod()) {
            }, callback);
        }
    }
}
