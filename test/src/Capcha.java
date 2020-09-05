import java.awt.*;
import javax.swing.*;

public class Capcha{
    JFrame f;
    Capcha(){
        f=new JFrame();

        JButton b1=new JButton(new ImageIcon("1.jpg"));
        JButton b2=new JButton(new ImageIcon("2.jpg"));
        JButton b3=new JButton(new ImageIcon("3.jpg"));
        JButton b4=new JButton(new ImageIcon("4.jpg"));
        JButton b5=new JButton(new ImageIcon("5.jpg"));
        JButton b6=new JButton(new ImageIcon("6.jpg"));
        JButton b7=new JButton(new ImageIcon("7.jpg"));
        JButton b8=new JButton(new ImageIcon("8.jpg"));
        JButton b9=new JButton(new ImageIcon("9.jpg"));

        f.add(b1);f.add(b2);f.add(b3);f.add(b4);f.add(b5);
        f.add(b6);f.add(b7);f.add(b8);f.add(b9);

        f.setLayout(new GridLayout(3,3));

        f.setSize(300,300);
        f.setVisible(true);
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
    public static void main(String[] args) {
        new Capcha();
    }
}
