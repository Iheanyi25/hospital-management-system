import React from 'react';
import formatAmount from "../../utils/formatAmount";

function RecieptCost({cost}) {
    const tax = 0; 
    return (
        <div>
            <div className="row">
                <small className=" col-5 m-0"> </small>
                <small className=" col-4 m-0">Subtotal </small>
                <small className="col-3 m-0">
                  &#8358;{formatAmount(cost)}
                </small>
            </div>
            <div className="row">
                <small className="col-5 m-0"></small>
                <small className="col-4 m-0">Tax</small>
                <small className="col-3 m-0">&#8358; {formatAmount(tax)}</small>
            </div>
            <div className="row">
                <small className="col-5 m-0"> </small>
                <p className="col-4 m-0">Total</p>
                <p className="col-3 m-0"> &#8358; {formatAmount(cost+tax)}</p>
            </div>
        </div>
    )
}

export default RecieptCost
