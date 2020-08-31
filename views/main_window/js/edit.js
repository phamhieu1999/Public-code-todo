$(document).ready(() => {
  // them task vao muc doing
  var addToDoing = function (e) {
    let code = e.key;
    let task = $('#add-work').val().trim();
    if ((e.type === 'click' || code === 'Enter') && task.length) {
      // console.log(code);
      $('#add-work').val("");
      let html = `
              <div class="bg-secondary item d-flex flex-row align-items-center justify-content-between">
                <input type="text" name="" id="${++g_id}" hidden>
                <div class="txt">
                    ${task}
                </div>
                <div class="d-flex">
                  <i class="fa fa-times text-danger"></i>
                  <i class="fa fa-pause text-warning"></i>
                  <i class="fa fa-check text-success"></i>
                </div>
              </div>
            `;
      $('#work-list').append(html);
      g_len.doing++;
      progress();
      const { port1, port2 } = new MessageChannel()
      ipcRenderer.postMessage('@add-task', { task: task, date: g_today, process: 1 }, [port1])
    }
  }

  // Xoa task
  var removeAnTask = function () {
    let item = $(this).parents('.item');
    let typeTask = item.parents('.work-list').attr('id');
    let id = item.children("input:text").attr("id");
    id = Number.parseInt(id);
    item.remove();
    switch (typeTask) {
      case 'work-list':
        g_len.doing--;
        break;
      case 'do-later-list':
        g_len.doLater--;
        break;
      case 'completed-list':
        g_len.completed--;
        break;
    }
    progress();
    const { port1, port2 } = new MessageChannel()
    ipcRenderer.postMessage("remove-task", { id: id }, [port1]);
  }

  //Chuyển trạng thái task từ doing sang do later
  // Khi click vào icon pause
  function taskPause() {
    g_len.doing--;
    g_len.doLater++;
    let item = $(this).parents('.item');
    let task = item.children(".txt").text().trim();
    let id = item.children("input:text").attr("id");
    item.remove();
    progress();
    let item2 = `
                <div class="bg-secondary item d-flex flex-row align-items-center justify-content-between">
                    <input type="text" name="" id="${id}" hidden>
                      <div class="txt">
                          ${task}
                      </div>
                      <div class="d-flex">
                          <i class="fa fa-times text-danger"></i>
                          <i class="fa fa-play text-warning"></i>
                          <i class="fa fa-check text-success"></i>
                      </div>
                  </div>
              `;
    $("#do-later-list").append(item2);
    const { port1, port2 } = new MessageChannel()
    ipcRenderer.postMessage("task-swap", { id: id, to: 2 }, [port1]);
  }

  // Chuyển trạng thái từ do later sang doing
  // Khi click vào icon play
  function taskPlay() {
    g_len.doing++;
    g_len.doLater--;
    let item = $(this).parents('.item');
    let task = item.children(".txt").text().trim();
    let id = item.children("input:text").attr("id");
    item.remove();
    progress();
    let item2 = `
                <div class="bg-secondary item d-flex flex-row align-items-center justify-content-between">
                    <input type="text" name="" id="${id}" hidden>
                      <div class="txt">
                          ${task}
                      </div>
                      <div class="d-flex">
                          <i class="fa fa-times text-danger"></i>
                          <i class="fa fa-pause text-warning"></i>
                          <i class="fa fa-check text-success"></i>
                      </div>
                  </div>
              `;
    $("#work-list").append(item2);
    const { port1, port2 } = new MessageChannel()
    ipcRenderer.postMessage("task-swap", { id: id, to: 1 }, [port1]);
  }

  // Chuyển trạng thái từ doing hoặc do later sang trạng thái đã hoàn thành
  // khi click vào icon check
  function taskCompleted() {
    g_len.completed++;
    let item = $(this).parents('.item');
    let task = item.children(".txt").text().trim();
    let id = item.children("input:text").attr("id");
    let typeTask = item.parents('.work-list').attr('id');
    item.remove();
    switch (typeTask) {
      case 'work-list':
        g_len.doing--;
        break;
      case 'do-later-list':
        g_len.doLater--;
        break;
    }
    progress();
    item.remove();
    let item2 = `
                <div class="bg-secondary item d-flex flex-row align-items-center justify-content-between">
                    <input type="text" name="" id="${id}" hidden>
                      <div class="txt">
                          ${task}
                      </div>
                      <div class="d-flex">
                          <i class="fa fa-times text-danger"></i>
                      </div>
                  </div>
              `;
    $("#completed-list").append(item2);
    const { port1, port2 } = new MessageChannel()
    ipcRenderer.postMessage("task-swap", { id: id, to: 3 }, [port1]);
  }


  $('#add-work').keyup(addToDoing);
  $('#icon-add-task').click(addToDoing);
  $('.work-list').on('click', '.item .fa-times', removeAnTask);
  $('.work-list').on('click', '.item .fa-pause', taskPause);
  $('.work-list').on('click', '.item .fa-check', taskCompleted);
  $('.work-list').on('click', '.item .fa-play', taskPlay);
})