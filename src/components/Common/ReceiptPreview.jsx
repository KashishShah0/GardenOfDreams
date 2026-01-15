
const ReceiptPreview = () => {
    return (
        <div id="receipt-preview" className="receipt-container hidden">
            <div className="receipt-header">
                <h2 id="print-brand">Garden of Dreams</h2>
                <p className="store-address">Thamel, Kathmandu, Nepal</p>
                <p className="store-contact">Tel: +977-1-4700000 | VAT: 123456789</p>
                <p className="receipt-title">RECEIPT</p>
            </div>

            <div className="receipt-details">
                <div className="dt-row">
                    <span>Inv No: <b id="print-order-id">#</b></span>
                    <span>Date: <span id="print-date"></span></span>
                </div>
                <div className="dt-row">
                    <span>Table: <b id="print-table"></b></span>
                    <span>Time: <span id="print-time"></span></span>
                </div>
            </div>

            <div className="receipt-divider dashed"></div>

            <div className="receipt-body">
                <table className="receipt-table">
                    <thead>
                        <tr>
                            <th className="col-item">Item</th>
                            <th className="col-price">Price</th>
                            <th className="col-qty">Qty</th>
                            <th className="col-total">Total</th>
                        </tr>
                    </thead>
                    <tbody id="print-items">
                        {/* Injected via DOM manipulation in printer.js */}
                    </tbody>
                </table>
            </div>

            <div className="receipt-divider dashed"></div>

            <div className="receipt-totals">
                <div className="total-row">
                    <span>Sub-Total:</span>
                    <span id="print-subtotal"></span>
                </div>
                <div className="receipt-divider dotted"></div>
                <div className="total-row final">
                    <span>Total:</span>
                    <span id="print-total"></span>
                </div>
            </div>

            <div className="receipt-footer">
                <p>** THANK YOU !! VISIT AGAIN **</p>
            </div>
        </div>
    );
};

export default ReceiptPreview;
