package com.crapp.smartmeter;


import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by erwinfoekema on 09/01/16.
 */
public class DateParam {
    private final Date date;

    public DateParam(String dateStr) throws WebApplicationException {
        if ( dateStr == null || "".equals(dateStr)) {
            this.date = null;
            return;
        }
        final DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            this.date = dateFormat.parse(dateStr);
        } catch (ParseException e) {
            throw new WebApplicationException(Response.status(Response.Status.BAD_REQUEST)
                    .entity("Couldn't parse date string: " + e.getMessage())
                    .build());
        }
    }

    public Date getDate() {
        return date;
    }
}
