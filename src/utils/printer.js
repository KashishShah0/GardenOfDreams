// Printer logic extracted from script.js

let printerDevice = null;
let printerCharacteristic = null;
const SERVICE_UUID = '000018f0-0000-1000-8000-00805f9b34fb';
const WRITE_UUID = '00002af1-0000-1000-8000-00805f9b34fb';

const ESC = "\x1B";
const GS = "\x1D";
const CTL_LF = "\x0A";

const CMDS = {
    RESET: ESC + "@",
    TEXT_FMT: ESC + "!" + "\x00",
    TEXT_FMT_BOLD: ESC + "!" + "\x08",
    ALIGN_LEFT: ESC + "a" + "\x00",
    ALIGN_CENTER: ESC + "a" + "\x01",
    ALIGN_RIGHT: ESC + "a" + "\x02",
    PAPER_CUT: GS + "V" + "\x41" + "\x03"
};

export const connectPrinter = async (onStatusChange) => {
    try {
        if (printerDevice && printerDevice.gatt.connected) {
            alert('Printer already connected');
            return;
        }

        printerDevice = await navigator.bluetooth.requestDevice({
            filters: [
                { services: [SERVICE_UUID] },
                { namePrefix: 'Ezo' },
                { namePrefix: 'POS' },
                { namePrefix: 'MTP' }
            ],
            optionalServices: [SERVICE_UUID]
        });

        const server = await printerDevice.gatt.connect();
        const service = await server.getPrimaryService(SERVICE_UUID);
        printerCharacteristic = await service.getCharacteristic(WRITE_UUID);

        printerDevice.addEventListener('gattserverdisconnected', () => {
            if (onStatusChange) onStatusChange(false);
            alert('Printer disconnected');
        });

        if (onStatusChange) onStatusChange(true);
        alert(`Connected to ${printerDevice.name}`);
        return true;

    } catch (error) {
        console.error('Bluetooth Error:', error);
        alert('Failed to connect: ' + error);
        return false;
    }
};

export const printBill = async (order) => {
    // Check if Bluetooth is ready
    if (printerDevice && printerDevice.gatt.connected && printerCharacteristic) {
        await printViaBluetooth(order);
    } else {
        // Fallback
        if (confirm("Printer not connected via Bluetooth. Use standard browser print?")) {
            // Ideally we used window.print(), but in React we assume the caller handles the view.
            // But here we want to trigger the print dialog for a Receipt component?
            // "populateHtmlReceipt" in legacy code did DOM manipulation.
            // In React, we should probably have a hidden Receipt component and use react-to-print or similar?
            // For now, let's just create a pop-up window or simple print.
            // Since we promised "intact logic", the legacy logic simply populated hidden divs and called window.print().
            populateHtmlReceipt(order);
            window.print();
        } else {
            // Prompt to connect
            // We can't easily trigger the connect from here without the UI event context if strict, 
            // but we can suggest it.
            alert("Please connect the printer first.");
        }
    }
};

function populateHtmlReceipt(order) {
    const dateObj = new Date(order.timestamp);
    if (document.getElementById('print-date')) document.getElementById('print-date').textContent = dateObj.toLocaleDateString();
    if (document.getElementById('print-time')) document.getElementById('print-time').textContent = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (document.getElementById('print-order-id')) document.getElementById('print-order-id').textContent = `#${order.id}`;
    if (document.getElementById('print-table')) document.getElementById('print-table').textContent = order.table;
    if (document.getElementById('print-subtotal')) document.getElementById('print-subtotal').textContent = `Rs. ${order.total.toLocaleString()}`;
    if (document.getElementById('print-total')) document.getElementById('print-total').textContent = `Rs. ${order.total.toLocaleString()}`;

    if (document.getElementById('print-items')) {
        document.getElementById('print-items').innerHTML = order.items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()}</td>
                <td>${item.qty}</td>
                <td>${(item.price * item.qty).toLocaleString()}</td>
            </tr>
        `).join('');
    }
}

async function printViaBluetooth(order) {
    const encoder = new TextEncoder();
    let data = "";

    // Header
    data += CMDS.RESET;
    data += CMDS.ALIGN_CENTER;
    data += CMDS.TEXT_FMT_BOLD;
    data += "GARDEN OF DREAMS" + CTL_LF;
    data += CMDS.TEXT_FMT;
    data += "Thamel, Kathmandu" + CTL_LF;
    data += "Tel: +977-1-4700000" + CTL_LF;
    data += CTL_LF;
    data += "RECEIPT" + CTL_LF;
    data += "--------------------------------" + CTL_LF;

    // Details
    data += CMDS.ALIGN_LEFT;
    data += `Inv: #${order.id}`.padEnd(16) + `Date: ${new Date(order.timestamp).toLocaleDateString()}` + CTL_LF;
    data += `Table: ${order.table}`.padEnd(16) + `Time: ${new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` + CTL_LF;

    data += "--------------------------------" + CTL_LF;
    data += "Item           Price Qty   Total" + CTL_LF;
    data += "--------------------------------" + CTL_LF;

    // Items
    order.items.forEach(item => {
        data += item.name.substring(0, 32) + CTL_LF;
        const priceStr = item.price.toString();
        const qtyStr = item.qty.toString();
        const totalStr = (item.price * item.qty).toString();
        data += `    ${priceStr} x ${qtyStr}`.padEnd(20) + totalStr.padStart(12) + CTL_LF;
    });

    data += "--------------------------------" + CTL_LF;

    // Totals
    data += CMDS.ALIGN_RIGHT;
    data += CMDS.TEXT_FMT_BOLD;
    data += "Sub-Total: Rs. " + order.total.toLocaleString() + CTL_LF;
    data += "Total: Rs. " + order.total.toLocaleString() + CTL_LF;
    data += CMDS.TEXT_FMT;

    // Footer
    data += CMDS.ALIGN_CENTER;
    data += CTL_LF;
    data += "** THANK YOU !! VISIT AGAIN **" + CTL_LF;
    data += CTL_LF + CTL_LF + CTL_LF;

    try {
        const buffer = encoder.encode(data);
        await printerCharacteristic.writeValue(buffer);
    } catch (e) {
        alert('Print failed: ' + e);
    }
}
