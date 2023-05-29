$(document).ready(function () {
  getPost();
  $("#container").animate({ marginLeft: "0" }, 1000);
  $('html, body').animate({ scrollTop: $(document).height() }, 1200, 'swing');
  $(".mycards").delay(2000).animate({ marginLeft: "300px" }, 500);
});

function posting() {
  let id = $('#id').val();
  let name = $('#name').val();
  let desc = $('#desc').val().replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/\s/g, '&nbsp;');
  let mbti = $('#mbti option:selected').text();
  let style = $('#style').val().replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/\s/g, '&nbsp;');

  let formData = new FormData();
  formData.append("id_give", id);
  formData.append("name_give", name);
  formData.append("desc_give", desc);
  formData.append("mbti_give", mbti);
  formData.append("style_give", style);

  fetch('/intro', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
      alert(data['msg'])
      window.location.reload()
  })
}

function getPost() {
  $('#cards-box').empty();
  fetch('/intro').then((res) => res.json()).then((data) => {

      let rows = data['result'];

      $.each(rows, function (i, item) {

          let id = item.id;
          let name = item.name;
          let url = '';
          switch (id) {
              case 'ps': url = 'ps.png';
                  break;
              case 'hj': url = 'hj.png';
                  break;
              case 'mj': url = 'mj.png';
                  break;
              case 'jy': url = 'jy.png';
                  break;
              default: url = '';
                  break;

          }

          console.log(item);

          let temp_html = `<div id=${id} class="col" onclick="clickCard(this.id)">  
                              <div class="card h-100">
                                  <button class="modifybtn" onclick="event.stopPropagation(); click_modifybtn('${id}')">수정</button>
                                  <button class="deletebtn" onclick="event.stopPropagation(); click_deletebtn('${id}')">삭제</button>
                                  <img src="../static/images/${url}" class="card-img-top" alt="..." />
                                  <div class="card-body" style="background-color:#e0e0e0;">
                                      <h5 class="card-title">${name}</h5>
                                  </div>
                              </div>
                          </div>`
          $('#cards-box').append(temp_html);
      })
  })
}

function clickCard(thisid) {
  $('#modalcon').empty();
  fetch('/intro').then((res) => res.json()).then((data) => {

      let rows = data['result'];

      $.each(rows, function (i, item) {
          if (thisid === item.id) {
              let name = item.name;
              let desc = item.desc;
              let mbti = item.mbti;
              let style = item.style;
              console.log(data['msg']);

              let url = '';
              switch (item.id) {
                  case 'ps': url = 'ps.png';
                      break;
                  case 'hj': url = 'hj.png';
                      break;
                  case 'mj': url = 'mj.png';
                      break;
                  case 'jy': url = 'jy.png';
                      break;
                  default: url = '';
                      break;
              }

              let temp_html = `<div id="modal_up" style='background-image:url(../static/images/${url}); background-repeat:no-repeat; '>
                                  <div id="modal_texts">
                                      <div id="myname" class="name">${name}<span id="mymbti">MBTI:${mbti}</span></div>
                                      <div id="im">I'm</div>
                                      <div class="desc" id="mydesc">${desc}</div>                   
                                      <div class="style" id="mystyle">Style:${style}</div>
                                  </div>
                              </div>`

              $('#modalcon').append(temp_html);
              $("#modal").addClass('active');
              $('#modal_up').addClass('active');
          }
      })
  })
}

// 수정하기 POST
function update_posting() {
  console.log('수정하기 POST!')

  let id_modify = $('#id_modify').val();
  console.log(id_modify)
  let name_modify = $('#name_modify').val();
  let desc_modify = $('#desc_modify').val().replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/\s/g, '&nbsp;');
  let mbti_modify = $('#mbti_modify option:selected').text();
  let style_modify = $('#style_modify').val().replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/\s/g, '&nbsp;');

  let formData = new FormData();
  formData.append("id_modify_give", id_modify);
  formData.append("name_modify_give", name_modify);
  formData.append("desc_modify_give", desc_modify);
  formData.append("mbti_modify_give", mbti_modify);
  formData.append("style_modify_give", style_modify);

  fetch('/update', { method: "PUT", body: formData }).then((res) => res.json()).then((data) => {
      alert(data['msg'])
      window.location.reload()
  })
}

// 수정하기 버튼과 연결되는 기능입니다. (GET) (김재용)
function click_modifybtn(thisid) {
  console.log('수정하기 GET!')
  $('#modalcon').empty();
  fetch('/intro').then((res) => res.json()).then((data) => {

      let rows = data['result'];

      $.each(rows, function (i, item) {
          if (thisid === item.id) {
              let name = item.name;
              let desc = item.desc;
              let mbti = item.mbti;
              let style = item.style;
              console.log(data['msg']);

              let url = '';
              switch (item.id) {
                  case 'ps': url = 'ps.png';
                      break;
                  case 'hj': url = 'hj.png';
                      break;
                  case 'mj': url = 'mj.png';
                      break;
                  case 'jy': url = 'jy.png';
                      break;
                  default: url = '';
                      break;
              }

              let temp_html = `<div id="modal_up" style='background-image:url(../static/images/${url}); background-repeat:no-repeat; '>
                                  <div id="modal_texts">
                                      <div class="mypost_modify" id="post-box-modify">
                                          <div class="form-floating mb-3">
                                              <textarea id="id_modify" class="form-control" placeholder="Leave a comment here">${thisid}</textarea>
                                          </div>
                                          <div class="form-floating mb-3">
                                              <textarea id="name_modify" class="form-control" placeholder="Leave a comment here">${name}</textarea>
                                          </div>
                                          <div class="form-floating mb-3">
                                              <textarea id="desc_modify" class="form-control" placeholder="Leave a comment here">${desc}</textarea>
                                          </div>
                                          <div class="input-group mb-3">
                                              <label id="mbtilabel" class="input-group-text" for="inputGroupSelect01">MBTI</label>
                                              <select class="form-select" id="mbti_modify">
                                                  <option selected>-- ${mbti} --</option>
                                                  <option value="1">INTJ</option>
                                                  <option value="2">INTP</option>
                                                  <option value="3">ENTP</option>
                                                  <option value="4">ENTJ</option>
                                                  <option value="5">INFJ</option>
                                                  <option value="6">INFP</option>
                                                  <option value="7">ENFP</option>
                                                  <option value="8">ENFJ</option>
                                                  <option value="9">ISFJ</option>
                                                  <option value="10">ISFP</option>
                                              </select>
                                          </div>
                                          <div class="form-floating">
                                              <textarea id="style_modify" class="form-control" placeholder="Leave a comment here">${style}</textarea>
                                          </div>
                                          <div class="mybtns">
                                              <button onclick="update_posting()" type="button" class="btn btn-outline-dark">수정하기</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>`

              $('#modalcon').append(temp_html);
              $("#modal").addClass('active');
              $('#modal_up').addClass('active');
          }
      })
  })
}

// 삭제하기 버튼 눌렀을때 개인카드가 삭제되는 기능입니다.(김재용)
function click_deletebtn(thisid) {
  let formData = new FormData();
  console.log(thisid)
  formData.append("id_give", thisid);

  fetch('/delete', { method: "DELETE", body: formData, }).then((res) => res.json()).then((data) => {
      alert(data["msg"]);
      window.location.reload();
      window.location.href = '/'
  })
}

function open_box() {
  $('#post-box').show()
}
function close_box() {
  $('#post-box').hide()
}

$(document).on('click', '#modal', () => {
  $('#modal').removeClass("active");
  $('#modal_up').removeClass("active");
});