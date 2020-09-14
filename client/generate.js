var app = new Vue({
    el: '#app',
    data: {
        GTIN: '',
        EXPIRY: '',
        BATCH: '',
        SN: '',
        location: '',
        productName: '',
        companyName: 'Safety First Medical Services',
        qrList: [],
        qrNumber: 1,
        isPrinting: false,
        importArray: [],
        currentIndex: 0
    },
    created()
    {
        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);

        this.GTIN= params.get("GTIN")
        this.EXPIRY= params.get("EXPIRY")
        this.BATCH= params.get("BATCH")
        this.SN= params.get("SN")
        this.location= params.get("location")
        this.productName= params.get("productName")
        this.qrNumber= params.get("qrNumber") || 1
    },
    mounted(){
        this.generate()
    },
    methods: {
        generate(){
            this.qrList= []
            for (var i= 0; i < this.qrNumber; i++){
                tempData= {
                    GTIN: this.GTIN,
                    EXPIRY: this.EXPIRY,
                    BATCH: this.BATCH,
                    SN: this.SN,
                    location: this.location,
                    productName: this.productName,
                    companyName: this.companyName,
                }
                tempData.qrValue= Math.round(Math.random()*8999999) + 1000000
                this.qrList.push(tempData)
            }
        },
        printList(){
            this.isPrinting= true
            setTimeout(() => {
                window.print();
                this.isPrinting= false
            }, 1000)
        },
    }
})
