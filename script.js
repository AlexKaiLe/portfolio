const app_list = ["Finder", "Settings", "Amazon", "CCMB", "Brown", "Insitro", "Harvard", "UC Davis", "Linkedin", "Trash",]
const folder_list = ["Resume", "Projects", "Artwork", "Coursework", "Interests"]
const days = {"SUN": "Sunday", "MON": "Monday", "TUE": "Tuesday", "THU": "Thursday", "FRI": "Friday", "SAT": "Saterday"}

const date = new Date();
const clockElement = document.getElementById("clock");
const powerSource = document.querySelector(".power_source");
const batteryProgress = document.querySelector(".battery_progress")
setTimeout(function() {
  document.getElementById('change-button').dispatchEvent(new MouseEvent("click"));
});
const openPortfolio = () => {
    document.getElementById('blur').style.animation = "static-img 1s normal forwards";
    document.getElementById('page').classList.toggle('static-page-display')
    document.getElementById('navbar').classList.toggle('static-page-display')
    document.getElementById('folders').classList.toggle('static-page-display')
    setTimeout(function() {
      document.getElementById('Amazon').dispatchEvent(new MouseEvent("click"));
    }, 2000);
}

const calculateBattery = () => {
    let batteryIsCharging = false;
    let number = Math.floor(Math.random() * 100);
    navigator.getBattery().then(function (battery) {
        number = Math.round(battery.level * 100);
        batteryIsCharging = battery.charging;

        document.querySelector(".battery_text").textContent = `${number}%`;
        document.getElementById("battery_popup_text").textContent = `${number}%`;
        batteryProgress.style.width = `${number}%`;

        if (number < 20){
            batteryProgress.style.background = `#ff0000b3`;
        }
        if (batteryIsCharging) {
            powerSource.textContent = "Power Adapter";
            document.querySelector(".is-charging").classList.add("is-charging-visibel");
            if (number > 80){
                batteryProgress.style.background = `#11dd4e`;
            }
        }
        else {
            powerSource.textContent = "Battery";
        }
    });
};

const day = date.toString().slice(0, 3);
Object.keys(days).filter(function(day) {
    document.getElementById('date_day').innerHTML= days[day];
})
const getDate = () => {
    var date = new Date(),
      hour = date.getHours(),
      minute = checkTime(date.getMinutes());
  
    function checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
  
    if (hour > 12) {
      hour = hour - 12;
      if (hour == 12) {
        hour = checkTime(hour);
        clockElement.innerHTML = hour + ":" + minute + " AM";
      } else {
        hour = checkTime(hour);
        clockElement.innerHTML = hour + ":" + minute + " PM";
      }
    } else {
      clockElement.innerHTML = hour + ":" + minute + " AM";
    }

    document.querySelector(".clock").addEventListener("click", () => {
        document.querySelector(".widgets_panel").classList.toggle("open");
    });
    
    document.getElementById("date").innerHTML = date.toDateString();
    document.getElementById('date_num').innerHTML = date.getDate();
    
}

const nav_click = (elmnt, dropdown, open, close) => {
    elmnt.addEventListener("click", () => {
        if (!dropdown.classList.contains(open)){
            dropdown.classList.add(open);
            dropdown.classList.remove(close);
        }
        else{
            dropdown.classList.add(close);
            dropdown.classList.remove(open);
        }
    });
}
nav_click(document.getElementById("apple"), document.querySelector(".apple_dropdown"), "apple_nav_open", "apple_nav_close");
nav_click(document.querySelector(".battery"), document.querySelector(".battery_dropdown"), "battery_nav_open", "battery_nav_close");

const shrinkApp = (app) => {
    elmnt = document.getElementById(app)
    elmnt.style = null;
    elmnt.classList.remove('expand')
    elmnt.classList.toggle('collapse')
}

const expandApp = (app) => {
    elmnt = document.getElementById(app)
    elmnt.style = null;
    elmnt.classList.remove('collapse')
    elmnt.classList.toggle('expand')
}

const openCloseApp = (id, folder_or_app) => {
  elmnt = document.getElementById(id+"_app")
  elmnt.style = null;
  elmnt.classList.remove('expand')
  elmnt.classList.remove('collapse')
  elmnt.classList.toggle('open');
  document.querySelector('.current_app').innerText = (document.querySelector('.current_app').innerText == id) ? "" : id;
  
  if (folder_or_app == "app"){
      document.getElementById(id).classList.toggle('app_bounce');
      document.getElementById(id+"_point").classList.toggle('show')
  }
  else if (folder_or_app == "folder"){
      document.getElementById(id+"_folder").classList.toggle('folder_highlight')
      document.getElementById(id+"_text").classList.toggle('text_highlight')
  }
  for (let i = 0; i < app_list.length; i++) {
      if (app_list[i] != id) {
          document.getElementById(app_list[i]).classList.remove('app_bounce');
          document.getElementById(app_list[i]+"_app").classList.remove("open");
          document.getElementById(app_list[i]+"_point").classList.remove('show');
      }
  }
  for (let i = 0; i < folder_list.length; i++) {
      if (folder_list[i] != id) {
          document.getElementById(folder_list[i]+"_app").classList.remove("open");
          document.getElementById(folder_list[i]+"_folder").classList.remove("folder_highlight");
          document.getElementById(folder_list[i]+"_text").classList.remove('text_highlight');
      }
  }
}

for (let i = 0; i < app_list.length; i++) {
    dragElement(document.getElementById(app_list[i] + "_app"));
}
for (let i = 0; i < folder_list.length; i++) {
    dragElement(document.getElementById(folder_list[i] + "_app"));
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "_header")) {
    document.getElementById(elmnt.id + "_header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    vert_dist = (elmnt.offsetTop - pos2)
    hort_dist = (elmnt.offsetLeft - pos1)
    if (vert_dist > 32){
        elmnt.style.top = vert_dist + "px";
    }
    elmnt.style.left = hort_dist + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('fade');
    }else {
        entry.target.classList.remove('fade');
    }
  });
});

document.querySelectorAll('.fade_left').forEach(element => {observer.observe(element);});
document.querySelectorAll('.fade_right').forEach(element => {observer.observe(element);});
document.querySelectorAll('.fade_top').forEach(element => {observer.observe(element);});
document.querySelectorAll('.fade_bottom').forEach(element => {observer.observe(element);});


const openFinderFolder = (id) => {
  var x = document.getElementById("Finder_app").querySelectorAll(".folder_left a"); 
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove("open")
  }
  document.getElementById(id+"-a").classList.add("open")

  document.getElementById("finder_" + id).classList.add('open')
  for (let i = 0; i < app_list.length; i++) {
    if (app_list[i] != id && app_list[i] != "Finder"){
      document.getElementById("finder_"+app_list[i]).classList.remove('open')
    }
  }
  for (let i = 0; i < folder_list.length; i++) {
    if (folder_list[i] != id && folder_list[i] != "Finder"){
      document.getElementById("finder_"+folder_list[i]).classList.remove('open')
    }
  }
}
const openFinderNav = (id) =>{
  var open_id = id;
  var close_id = id == "finder_desktop" ? "finder_dock" : "finder_desktop";
  document.getElementById(open_id+"_open").classList.add('open')
  document.getElementById(close_id+"_open").classList.remove('open')
  document.getElementById(open_id).classList.add('open')
  document.getElementById(close_id).classList.remove('open')
}