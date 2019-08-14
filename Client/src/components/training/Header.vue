<template>
  <div id="app">
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <!-- <a class="navbar-brand" href="#">CHAT RESPONSOR</a> -->
        <!-- Image and text -->
        <div id="mySidenav" class="sidenav" @mouseleave="closeNav()">
          <!-- <a href="javascript:void(0)" class="closebtn">&times;</a> -->
          <div clas="item">
            <a href="#/">
              <i class="fa fa-home"></i>Home
            </a>
          </div>
          <div>
            <a href="#/chat">
              <i class="fa fa-comments" aria-hidden="true"></i>Chat
            </a>
          </div>
          <div>
            <a href="#/questions"><i class='fa fa-search'></i>Questions</a>
          </div>
        </div>

        <span style="font-size:30px;cursor:pointer" @mouseover="openNav()">&#9776;</span>

        <!-- <a href="#/chat">
          <img
            src="../../assets/chat.png"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt
          />
        </a>-->
        <div class="navbar-brand d-inline-block align-top ml-3">CHAT Responsor</div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Page: Nightly</a>
              <!-- <a>Action</a> -->
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Nightly</a>
                <a class="dropdown-item" href="#">Nightly2</a>
                <!-- <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>-->
              </div>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Category: Nightly</a>
              <!-- <a>Action</a> -->
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Nightly</a>
                <a class="dropdown-item" href="#">Nightly2</a>
                <!-- <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>-->
              </div>
            </li>
            <li>
              <div class="row mt-2 _option">
                <div for="sel1" class="col">Language:</div>
                <select class="language col" id="sel1">
                  <option>Tiếng Việt</option>
                  <option>English</option>
                </select>
              </div>
            </li>
          </ul>

          <!-- <a class="navbar-brand">Navbar</a> -->
          <form class="form-inline">
            <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
            <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Login</button>
          </form>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openNav() {
      document.getElementById("mySidenav").style.width = "200px";
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    }
  }
};
</script>


<style >
/* a{
  background-color: #f3ebeb;
  margin-bottom: 2px;
} */
._option {
  float: left;
  opacity: 0.6;
  align-items: center;
}
#sel1 {
  width: 140px;
  margin-left: -25px;
}

body {
  font-family: "Lato", sans-serif;
}
i{
  padding-right: 5px;
}
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  background-color: rgb(62, 179, 130);

  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 20px;
  text-decoration: none;
  font-size: 25px;
  color: #000000;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #ae94f5;
  background-color: aliceblue;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
