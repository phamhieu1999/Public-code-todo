const { ipcRenderer } = window;
// var todayTasks;
var g_len = {
  doing: 0,
  doLater: 0,
  completed: 0,
  total: 0
}
var g_id = 1000000;
// var lens = getLen();
//Add english month name

//initialize for get data  today
async function init(callback1, callback2, callback3) {
  let date = new Date().dbFormat(new Date());
  const result = await ipcRenderer.invoke("get-data-by-date", { date: date })
  callback1(result);
  callback2();
  callback3(result);
}

async function setG_ID() {
  const result = await ipcRenderer.invoke("set-g-id", [])
  g_id = result.pop().id;
}

function setDate() {
  var date = new Date();
  $('.day').text(date.getDate());
  $('.month').text(Date.locale['en'].month_names_short[date.getMonth()]);
  $('.year').text(date.getFullYear());
  $('.day-of-week').text(date.getDayOfWeek());
}
function setG_Len(todayTasks) {
  g_len.doing = todayTasks.filter(e => e.process == 1).length;
  g_len.doLater = todayTasks.filter(e => e.process == 2).length;
  g_len.completed = todayTasks.filter(e => e.process == 3).length;
}

function progress() {
  let len1 = g_len.doing;
  let len2 = g_len.doLater;
  let len3 = g_len.completed;
  let total = len1 + len2 + len3;
  if (!total) {
    $('#progress-task .compl').css({
      "width": "0%"
    })
    $('#progress-task .dolte').css({
      "width": "0%"
    })
  } else {
    $('#progress-task .compl').css({
      "width": Math.floor(100 * len3 / total) + "%"
    })
    $('#progress-task .dolte').css({
      "width": Math.floor(100 * len2 / total) + "%"
    })
  }
}

function setHtmlInit(todayTasks) {
  let html = "";
  $('#work-list').html(html);
  $('#do-later-list').html(html);
  $('#completed-list').html(html);
  todayTasks.forEach(element => {
    let { id, task, date, process } = element;
    let idTag, tail;
    let down = false;
    switch (process) {
      case 1:
        idTag = "work-list";
        tail = `
          <i class="fa fa-pause text-warning"></i>
              <i class="fa fa-check text-success"></i>
            </div>
          </div>
      `;
        break;
      case 2:
        down = true;
        idTag = "do-later-list";
        tail = `<i class="fa fa-play text-warning"></i>
                <i class="fa fa-check text-success"></i>
            </div>
          </div>`;
        break;
      case 3:
        down = true;
        idTag = "completed-list";
        tail = ` </div>
            </div>`;
        break;
    }
    html = `
      <div class="bg-secondary item d-flex flex-row align-items-center justify-content-between">
        <input type="text" name="" id="${id}" hidden>
        <div class="txt">
            ${task}
        </div>
        <div class="d-flex">
            <i class="fa fa-times text-danger"></i>
            ${tail}
    `;
    $(`#${idTag}`).append(html);
    if (down)
      $(".show-more-or-less").removeClass("fa-angle-right").addClass("fa-angle-down");
  });
}
const g_today = new Date().dbFormat(new Date());
setDate();
$(document).ready(function () {
  init(setG_Len, progress, setHtmlInit);
  setG_ID();
})
$(document).on("refresh", function () {
  init(setG_Len, progress, setHtmlInit);
})