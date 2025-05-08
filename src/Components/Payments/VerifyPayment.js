import axios from "axios";
import BackendAPi from "../../Utils/ConnectBackendAPis";

async function VerifyPayment(smtg,order_id) {
let response = await axios.post(BackendAPi(`orders/${order_id}/verify_payment/`), smtg,{
    headers: {
        Authorization: `JWT ${localStorage.getItem("isLoggedIn")}`


} })
// console.log(response.data);
if(response.status == 200) {
    return"1"}
    else{return "0"}
}
export default VerifyPayment;