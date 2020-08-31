const { ipcRenderer } = window
$(document).ready(function () {
  async function sendMailClick(callback) {
    let date = $("#inp-date-picker").val();
    date = new Date().dbFormat(new Date(date));
    const result = await ipcRenderer.invoke("get-data-by-date", { date: date });
    console.log(result);
    callback(result);
  }

  function getMailContent(tasks) {
    let mContent = ipcRenderer.sendSync('get-mail-content', { tasks: tasks })
    console.log(mContent);
    $("#mail-content").val(mContent);
  }

  sendMailClick(getMailContent);

  $(".btn-submit-send-mail").click(function () {
    let recipient = $("#recipient").val().trim();
    let subject = $("#subject").val().trim();
    let content = $("#mail-content").val();
    let option = {
      from: 'hieupv@vietis.com.vn',
      to: recipient,
      subject: subject,
      text: content
    }
    if (recipient.length && subject.length) {
      ipcRenderer.send("@request-send-report", option);
    } else {
      alert("Please fill all input")
    }
  })
})