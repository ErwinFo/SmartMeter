package com.crapp.smartmeter;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by erwinfoekema on 09/01/16.
 */
@ApplicationPath("/")
public class SmartMeterApplication extends Application {

    /*
    A static initializer declared in a class is executed when the class is initialized.
    Together with any field initializers for class variables, static initializers may be
    used to initialize the class variables of the class.

    In this case it fires off the thread.
     */
    static {
        System.out.println("static");
        Thread myThread = new Thread(new MainProcess());
        myThread.start();
    }

    @Override
    public Set<Class<?>> getClasses() {
        System.out.println("SmartMeterApplication getClasses");

        final Set<Class<?>> classes = new HashSet<Class<?>>();
        // register root resource
        classes.add(SmartMeterSuite.class);
        return classes;
    }

    private static class MainProcess implements Runnable {

        public MainProcess() {
        }

        public void run() {
            System.out.println("MainProcess run");

            try {
                (new ProcessData()).connect("/dev/ttyUSB1");
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }


}