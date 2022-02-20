const app = Vue.createApp({
    data() {//靜態資料
        return {
            currentForm: 'personal-form',
            form: {}//06.但是現在form是空值，所以想要透過watch來判斷使用者輸入資料，並把值放進來
        }
    },
    methods: {
        updateForm(value) {
            this.currentForm = value
        },
        updateData(data) {
            this.form[data.key] = data.value
        }//11.帶入剛才從 $emit 收到的 {'key':'name','value':value}
    },
    computed: {//會需要運算的資料
        computedForm: function () {//04.想要判定在final-form介面再執行
            console.log(this.currentForm)
            if (this.currentForm == 'final-form') {
                return this.form//05.回傳form的資料
            }
        }
    }
})

const app = Vue.createApp({
    data() {
        return {
            currentform: 'personal-form'
        form: {}  //this.Form的This所指就是這個
        }
    }
})

computed: {
    computedForm: function() {
        if (this.currentForm)
    }
}
methods: {
    updateForm(value){
        this.currentForm = value
    },
}
updateInfo(data){

    this.form[data.key] = data.value  //寫穿了就是動態化綁定,最後會呈現name,phone,arrdess的資料
}

app.component('persona-form', {
    template: '#form1'
    methods: {
        nextStepts() { }
    }
})
app.component('personal-form', {
    template: '#form1',
    data() {
        return {
            name: '',
            phone: ''
        }
    },
    methods: {
        nextSteps() {
            this.$emit('set-form', 'address-form')
        }
    },
    watch: {//watch一直在監聽key,name,value
        name: {
            handler(value) {
                this.$emit('update', { 'key': 'name', 'value': value })
                //emit 可以用來定義一個組件可以 向其(父)組件觸發的事件 像把靈魂彈出去可以看到全局
            }
        },
        phone: {
            handler(value) {
                this.$emit('update', { 'key': 'phone', 'value': value })
            }
        }
    }
})

app.component('address-form', {
    template: '#form2',
    data() {
        return {
            address: ''
        }
    },
    methods: {
        nextSteps() {
            this.$emit('set-form', 'final-form')
        },
        preSteps() {
            this.$emit('set-form', 'personal-form')
        },
    },
    watch: {
        address: {
            handler(value) {
                this.$emit('update', { 'key': 'address', 'value': value })
            }
        }
    }
})

app.component('final-form', {
    template: '#form3',
    props: ['formData'],
    methods: {
        preSteps() {
            this.$emit('set-form', 'address-form')
        },
    }
})
app.mount('#app')