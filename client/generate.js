var Constants= {
    url: {
        baseServer: "/server/zoho_books_qr_code_function",
        item: "/server/zoho_books_qr_code_function/item",
        codes: "/server/zoho_books_qr_code_function/codes"
    }
}

var app = new Vue({
    el: '#app',
    data: {
        isLoading: false,
        item_id: '',
        companyName: 'Safety First Medical Services',
        qrList: [],
        qrNumber: 0,
        isPrinting: false,
        importArray: [],
        currentIndex: 0,
        item: {
            gtin: "",
            item_id: "",
            batch: "",
            location: "",
            expiry: "",
            product_name: "",
            sn: "",
        }
    },
    created()
    {
        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);

        this.item_id= params.get("item_id")
        this.item.item_id= params.get("item_id")
        this.item.gtin= params.get("GTIN")
        this.item.expiry= params.get("EXPIRY")
        this.item.batch= params.get("BATCH")
        this.item.sn= params.get("SN")
        this.item.location= params.get("location")
        this.item.product_name= params.get("product_name")
        if(params.get("qrNumber")){
            this.qrNumber= params.get("qrNumber")
        }else{
            // this.qrNumber= prompt("Please enter the number of Qr Codes you wish to generate: ", 10);
        }

        this.getItemData()
    },
    mounted(){
    },
    computed: {
        currentItemQrCodes(){
            return this.item.codes ? this.item.codes.length : 0
        }
    },
    methods: {
        getItemData(){
            this.isLoading= true
            return axios.get(Constants.url.item+ "/" + this.item_id).then(res => {
                console.log(res.data.item)
                if(res.data.item){
                    this.item= res.data.item
                    this.qrNumber= this.item.codes.length
                }
                this.isLoading= false
            }).catch(err => {
                console.log(err)
                this.isLoading= false
            })
        },
        generate(num){
            this.isLoading= true
            let qrList= []
            let temp_qrValue= Math.round(Math.random()*8999999) + 1000000
            for (var i= 0; i < num; i++){
                var tempData= {
                    item_id: this.item.item_id
                }
                tempData.qrvalue= temp_qrValue
                qrList.push(tempData)
            }
            axios.post(Constants.url.codes, {
                codes: qrList
            }).then(res => {
                console.log(res.data)
                this.getItemData()
                this.isLoading= false
            }).catch(err => {
                console.log(err)
                this.isLoading= false
            })
        },
        printList(){
            this.isPrinting= true
            setTimeout(() => {
                window.print();
                this.isPrinting= false
            }, 1000)
        },
        saveItem(){
            this.isLoading= true
            var itemData= {...this.item, codes: undefined}
            axios.post(Constants.url.item, {
                item: itemData
            }).then(res => {
                console.log(res.data)
                let generate= this.qrNumber - this.currentItemQrCodes
                if(res.data.item){
                    this.item= res.data.item
                    if(generate > 0)
                        this.generate(generate)
                }
                this.isLoading= false
            }).catch(err => {
                console.log(err)
                this.isLoading= false
            })
        }
    }
})
