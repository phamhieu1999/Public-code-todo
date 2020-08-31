$(document).ready(() => {
  $("#menu-im-ex-gr li").click(function () {
    $("#menu-im-ex-gr").hide();
  })
  $(".show-more-or-less").click(function () {
    // debugger
    if ($(this).hasClass("fa-angle-right")) {
      $(this).removeClass("fa-angle-right").addClass("fa-angle-down");
      $(this).parent().parent().children(".work-list").toggle(600);
    } else {
      $(this).addClass("fa-angle-right").removeClass("fa-angle-down");
      $(this).parent().parent().children(".work-list").toggle(600);
    }
  })

  //click reset progress 
  $(".reset-progress").click(function () {
    let date = $("#inp-date-picker").val();
    date = new Date().dbFormat(new Date(date));
    let getData = async (date, callback1, callback2, callback3) => {
      const res = await ipcRenderer.invoke("reset-progress", { date: date, from1: 1, from2: 3, to: 2 });
      // debugger
      callback1(res); callback2(); callback3(res);
    }
    getData(date, setG_Len, progress, setHtmlInit);
  })

  // Click send mail
  $(".send-mail").click(function () {
    const { port1, port2 } = new MessageChannel()
    ipcRenderer.postMessage('popup-mail-window', {}, [port1])
  })


  // Khi nào trên 17h thì mới được click vào phần gửi mail báo cáo hàng ngày
  setInterval(function () {
    let d = new Date();
    let h = d.getHours();
    if (h < 17) {
      $(".send-mail").css({
        "pointer-events": "all",
        "color": "#000"
      });
    }
  }, 100)
})