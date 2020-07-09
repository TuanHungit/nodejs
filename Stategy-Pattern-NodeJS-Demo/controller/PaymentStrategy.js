//Strategy
class PaymentStrategy{
  constructor(type){
    this.type = type;
  }
  getType(){
    return this.type
  }
  pay(){
    console.log(`Thanh toán `);
  }
}
module.exports = PaymentStrategy;
