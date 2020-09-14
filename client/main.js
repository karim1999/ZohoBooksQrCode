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
        this.qrValue= params.get("data")
        this.EXPIRY= params.get("EXPIRY")
        this.BATCH= params.get("BATCH")
        this.SN= params.get("SN")
    },
    mounted(){
    },
    computed: {
        qrLink(){
            var data= this.importArray[this.currentIndex]
            if(data){
                return "/app/generate.html?qrNumber="+ this.qrNumber +"&GTIN="+ data.GTIN +"&EXPIRY="+ data.EXPIRY +"&BATCH="+ data.BATCH +"&SN="+ data.SN +"&location="+ data.location +"&productName="+ data.productName
            }
            return null
        }
    },
    methods: {
        setCurrentIndex(index){
            this.currentIndex= index
        },
        addToImportArray(){
            var qr= {
                GTIN: this.GTIN,
                EXPIRY: this.EXPIRY,
                BATCH: this.BATCH,
                SN: this.SN,
                location: this.location,
                productName: this.productName,
                companyName: this.companyName,
            }
            this.importArray.push(qr)
            this.$refs.closeModal2.click()
        },
        generate(){
            // var data= this.importArray[this.currentIndex]
            // this.qrList= []
            // for (var i= 0; i < this.qrNumber; i++){
            //     var tempData= Object.assign({}, data)
            //     tempData.qrValue= Math.round(Math.random()*8999999) + 1000000
            //     console.log(tempData.qrValue)
            //     this.qrList.push(tempData)
            // }
            this.$refs.closeModal.click()
            this.$refs.qrLink.click()
        },
        printList(){
            this.isPrinting= true
            setTimeout(() => {
                window.print();
                this.isPrinting= false
                this.$refs.closeQrModal.click()
            }, 1000)
        },
        importFile(event){
            var reader = new FileReader();
            var f = event.target.files[0];
            reader.onload = (e) => {
                this.parseResult(e.target.result); //this is where the csv array will be
            };
            reader.readAsText(f);
        },
        parseResult(result) {
            result.split("\n").forEach((row) => {
                var importElArr = row.split(",")
                if(row !== ""){
                    var importEl = {
                        productName: importElArr[0] || "",
                        GTIN: importElArr[1] || "",
                        EXPIRY: importElArr[2] || "",
                        BATCH: importElArr[3] || "",
                        SN: importElArr[4] || "",
                        location: importElArr[5] || "",
                        companyName: this.companyName,
                    };
                    this.importArray.push(importEl);
                }
            });
        }
    }
})
