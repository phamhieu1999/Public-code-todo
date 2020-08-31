$(document).ready(() => {
  $("#inp-date-picker").change(function () {
    let date = $(this).val();
    // debugger
    date = new Date().dbFormat(new Date(date));
    let getData = async (date, callback1, callback2, callback3) => {
      const res = await ipcRenderer.invoke("get-data-by-date", { date: date });
      // debugger
      callback1(res); callback2(); callback3(res);
    }
    getData(date, setG_Len, progress, setHtmlInit);
  })
})