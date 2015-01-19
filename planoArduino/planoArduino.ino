#include <Ultrasonic.h>

int val;

#define TRIGGER_PIN1  12
#define ECHO_PIN1     13
#define TRIGGER_PIN2  8
#define ECHO_PIN2     9


int ext1 , ext2 ;
float ext_front , new_frontval, dif_front;
float calib_value;
int a ;
int flag_o = 1, flag_s = 1;


Ultrasonic ultrasonic_front(TRIGGER_PIN1, ECHO_PIN1);
Ultrasonic ultrasonic_back(TRIGGER_PIN2, ECHO_PIN2);

void setup()
{
  Serial.begin(9600);
  delay(5000);
  ext_front = calibratefront_sens();
}
float calibratefront_sens() {
  float cmMsec, inMsec;
  long microsec = ultrasonic_front.timing();
  inMsec = ultrasonic_front.convert(microsec, Ultrasonic::IN);
  //delay(500);
  return inMsec;

}
float calibrateback_sens() {
  float cmMsec, inMsec;
  long microsec = ultrasonic_back.timing();
  inMsec = ultrasonic_back.convert(microsec, Ultrasonic::IN);
  delay(1500);
 
  return inMsec;

}

bool OutofStockOrNot(float c)
{

  if (c > 11 && flag_o == 1) { //Out Of Stock
    Serial.println("o");
    //Serial.print(c);
   
    flag_o = 0;
    flag_s = 1;
  }
  else if (c < 10 && flag_s == 1) { //In stock

    Serial.println("s");
    //Serial.print(c);
    flag_s = 0;
    flag_o = 1;
  }
}

void loop()
{
  new_frontval = calibratefront_sens();
  OutofStockOrNot(new_frontval);
  delay(300);
}
