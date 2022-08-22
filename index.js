const PDFParser = require('pdf2json');

(async () => {
    const pdfParser = new PDFParser(this, 1);
    pdfParser.loadPDF('odf.pdf');
    const table = await new Promise( async (resolve, reject) => {
        pdfParser.on('pdfParser_dataReady', (pdfData) => {
            const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
            const regex = /(\d{4}XX\d{6}TDAXXX)(\d{7})(.{2}-.{2}-.{2}-.{4}-.{5}-.{4})(\$\d*,?\d*\.?\d*)(\d{2}\/\d{2}\/\d{4})/g;
            let match;
            let count = 0;
            const records = [];
            while ((match = regex.exec(raw)) != null){
                count++;
                const record = {
                    id: count,
                    taxDeed: match[1],
                    taxCertificate: match[2],
                    parcel: match[3],
                    itialBild: match[4],
                    saleDate: match[5]
                }
                records.push(record);
            }
            resolve(records);
        });
    });
    console.log(table);
})();