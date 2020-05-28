package com.company;

import java.io.File;

public class Main {

    public static void main(String[] args) {
        File folder =  new File("C:\\Users\\Catalin\\Downloads\\Valentin");
        File[] listOfFiles = folder.listFiles();
        // has to be run twice for some reason....
        for( int i=0; i< listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                String fileName = listOfFiles[i].getName();
                int namelength = fileName.length();

                fileName = fileName.replace("y2mate.com - ", "");
                fileName = fileName.substring(0, namelength - 16) + ".mp3";

                listOfFiles[i].renameTo(new File(fileName));
            }
        }
    } //end main
}// end class
