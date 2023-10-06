import "./Footer.css"
import copyIcon from "../assets/copy.png"
export default function Footer() {
    return (
        <div className="footer shadow-lg py-3 mt-5 ">
            <span>copyright<span><img className="ficon" src={copyIcon} alt="copyright"/></span>  2023  <strong>Team Strom Troopers </strong></span> &nbsp;
            </div>
    )
}