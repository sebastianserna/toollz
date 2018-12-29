var dataTools = 'data/tools.json';
new Vue({
    el: '#app',
    created: function() {
        this.getTools();
    },
    data: {
        tools: [],
        search: '',
        filterLevel: '',
    },
    methods: {
        getTools: function() {
            axios.get(dataTools).then(response => {
                this.tools = response.data
            });
        }
    },
    computed: {
        filterTools: function() {
            return this.tools.filter((tool) => {
                // Using normalize based on https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
                return  tool.summary.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").match(this.search) 
                        || tool.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").match(this.search)
                        || tool.type.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").match(this.search)
            });
        }

    }

});