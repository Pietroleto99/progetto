var vm = new Vue({
  el: "#container",
  methods: {
    setCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie: function(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    checkCookie: function() {
      var user = this.getCookie("username");
      while (user === "") {
        user = prompt("Please enter your name:", "");
        if (user !== "" && user != null) {
          this.setCookie("username", user, 30);
        }
      }
      this.name = user;
    },
    editCookie: function() {
      var user = prompt("Please enter your name:", this.name);
      if (user === null) {
        return;
      }
      this.justDeleteCookie();
      this.setCookie("username", user, 30);
      this.name = user;
    },
    justDeleteCookie: function() {
      document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    },
    deleteCookie: function() {
      this.justDeleteCookie();
      alert("Cookie eliminato correttamente, aggiorna la pagina");
    },
    salvaDati: function() {
      if (this.bookTmp.title === "") {
        alert("Inserire un titolo");
        return;
      }
      if (this.bookTmp.image === "") {
        alert("Inserire un'immagine");
        return;
      }
      if (this.bookTmp.description === "") {
        alert("Inserire una descrizione");
        return;
      }
      if (this.bookTmpIndex === -1) {
        this.bookInfo.push(this.bookTmp);
      } else {
        this.bookInfo.splice(this.bookTmpIndex, 1, this.bookTmp);
      }
      $("#bookModal").modal("hide");
    },
    editBook: function(index) {
      console.log("Edit: " + index);
      this.formTitle = "Modifica libro";
      this.bookTmp = Object.assign({}, this.bookInfo[index]);
      this.bookTmpIndex = index;
      $("#bookModal").modal();
    },
    deleteBook: function(index) {
      console.log("Delete: " + index);
      if (confirm("Sei sicuro di voler eliminare il libro?")) {
        this.bookInfo.splice(index, 1);
      }
    },
    addBook: function() {
      console.log("Add");
      this.formTitle = "Aggiungi libro";
      this.bookTmp.title = "";
      this.bookTmp.image = "";
      this.bookTmp.description = "";
      this.bookTmpIndex = -1;
      $("#bookModal").modal();
    },
    switchColorato: function(index) {
      this.bookInfo[index].hasColorato = !this.bookInfo[index].hasColorato;
    }
  },
  mounted: function() {
    this.checkCookie();
  },
  data: {
    name: "",
    hasColorato: false,
    formTitle: "Titolo",
    bookTmpIndex: -1,
    bookTmp: {
      title: "",
      image: "",
      description: ""
    },
    bookInfo: [
      {
        title: "La Divina Commedia",
        hasColorato: false,
        image:
          "https://static.lafeltrinelli.it/static/images-1/xl/297/698297.jpg",
        description:
          "L'autore Dante Alighieri si fa un giro tra Inferno, Purgatorio e Paradiso con il suo amico Virgilio e con la sua amata Beatrice."
      },
      {
        title: "I promessi sposi",
        hasColorato: false,
        image:
          "https://i2.wp.com/www.iurisprudentes.it/wp-content/uploads/2017/02/I-promessi-sposi.jpg?fit=1206%2C1590&ssl=1",
        description:
          "Renzo e Lucia vogliono sposarsi, ma Don Rodrigo non vuole, quindi si fanno tutti un bel giro per il nord Italia finché alla fine riescono a maritarsi."
      }
    ]
  }
});
