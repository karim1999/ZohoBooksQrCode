var app = new Vue({
    el: '#app',
    data: {
        GTIN: '',
        EXPIRY: '',
        BATCH: '',
        SN: '',
        productName: '',
        companyName: 'Safety First Medical Services',
        qrList: [],
        qrNumber: 1,
        isPrinting: false,
    },
    created()
    {
        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.GTIN= params.get("GTIN")
        this.qrValue= params.get("data")
        this.EXPIRY= params.get("EXPIRY")
        this.BATCH= params.get("BATCH")
        this.SN= params.get("SN")
    },
    mounted(){
    },
    methods: {
        generate(){
            this.qrList= []
            for (var i= 0; i < this.qrNumber; i++){
                var qr= {
                    GTIN: this.GTIN,
                    EXPIRY: this.EXPIRY,
                    BATCH: this.BATCH,
                    SN: Math.round(Math.random()*8999999) + 1000000,
                    productName: this.productName,
                    companyName: this.companyName,
                }
                this.qrList.push(qr)
            }
        },
        printList(){
            this.isPrinting= true
            setTimeout(() => {
                window.print();
                this.isPrinting= false
            }, 1000)
        }
    }
})
