
const vm = new Vue({
    el: "#app",

    data: function(){
        return {
            logs: {}
        }
    },

    mounted:function(){
        this.fetchData();
    },

    methods: {
        fetchData: function(){
            $.ajax({
                url: '/api/admin/log',
                type: 'get',
                dataType: 'json',
                success: function(data){
                    console.log(data)
                    this.logs = data;
                }
            })
        }
    }
})