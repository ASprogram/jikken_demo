/**
 * 現段階でのtodo
 * それぞれの関数にコメントつける
 * 睡眠時間とかの日々のルーティーンの設定
 * 優先度に応じたTodoのスケジューリングの実装
 * 授業の取得
 * 祝日(学校の日程)の実装
 * イベントの固定とかの見直し
 */

/**
 * function GateDate()
 * FullCalendar用の時間情報を返す。
 * 引数：なし
 * 返り値：なし
 */

const now = new Date();
const GetDate = {
  Year: now.getFullYear(),
  Month: ("0" + (now.getMonth() + 1)).slice(-2),
  Date: ("0" + now.getDate()).slice(-2),
  Hour: ("0" + now.getHours()).slice(-2),
  Min: ("0" + now.getMinutes()).slice(-2),
};

/**
 * function GetEvents(id)
 * idに対応した人のイベント(ToDoとか予定とか)を取ってくる
 * 引数：ユーザー固有のID
 * 返り値：連想配列の配列
 * [{title: イベント名, start:イベント開始時間, end: イベント終了時間, editable: 固定された用事かどうか, overlap: その予定の上に重ねれるか}]
 */
function GetEvents(id) {
  // 仮置きのeventを用意
  const events = [
    {
      title: "test",
      start:
        GetDate.Year + "-" + GetDate.Month + "-" + GetDate.Date + "T13:00:00",
      end:
        GetDate.Year + "-" + GetDate.Month + "-" + GetDate.Date + "T15:00:00",
      editable: false,
    },
  ];
  return events;
}
let calendar = null; // calendarオブジェクトをグローバル変数にしておく
document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  // calendar = new FullCalendar.Calendar(calendarEl, {
  //   // カレンダーに表示する文字を日本語にする
  //   //locale: 'ja',

  //   headerToolbar: {
  //     left: "prev,next today",
  //     center: "title",
  //     right: "dayGridMonth,timeGridWeek_Today,timeGridDay,listMonth",
  //   },
  //   views: {
  //     // 今日を開始日とした1週間の表示
  //     timeGridWeek_Today: {
  //       type: "timeGrid",
  //       duration: { days: 7 },
  //       buttonText: "Week",
  //     },
  //   },
  //   navLinks: true, // can click day/week names to navigate views
  //   editable: true,
  //   selectable: true,
  //   nowIndicator: true,
  //   events: GetEvents(0),

  //   // イベントがクリックされたとき
  //   eventClick: function (jsEvent) {
  //     if (window.confirm("このイベントを削除しますか？")) {
  //       jsEvent.event.remove();
  //     }
  //   },
  //   eventTimeFormat: { hour: "2-digit", minute: "2-digit" },
  // });

  // calendar.render();
});

// logoutIcon = document.getElementById("logoutIcon");
// logoutIcon.addEventListener("click", function (e) {
//   var result = window.confirm("ログアウトしますか？");
//   if (result) {
//     location.href = "after_login.html";
//   }
// });

let plan = {
  title: document.getElementById("Plan_title"),
  date_start: document.getElementById("Plan_startdate"),
  time_start: document.getElementById("Plan_starttime"),
  date_end: document.getElementById("Plan_enddate"),
  time_end: document.getElementById("Plan_endtime"),
};
let todo = {
  title: document.getElementById("Todo_title"),
  date: document.getElementById("Todo_date"),
  time: document.getElementById("Todo_time"),
  len: document.getElementById("Todo_len"),
  priority: document.getElementById("Todo_priority"),
};

let add_plan = document.getElementById("Plan_add");
let add_todo = document.getElementById("Todo_add");

add_plan.addEventListener("click", function (e) {
  if (plan.title.value == "") {
    alert("タイトルを入力してください");
  } else if (plan.date_start.value == "") {
    alert("開始日を入力してください");
  } else if (plan.date_end.value == "") {
    alert("終了日を入力してください");
  } else if (plan.time_start.value == "") {
    alert("開始時間を入力してください");
  } else if (plan.time_end.value == "") {
    alert("終了時間を入力してください");
  } else if (
    plan.date_end.value < plan.date_start.value ||
    (plan.date_end.value == plan.date_start.value &&
      plan.time_end.value < plan.time_start.value)
  ) {
    alert("終了日時は開始日時よりも後にしてください");
  } else {
    let events = calendar.getEvents();
    const time_start = new Date(
      plan.date_start.value.substr(0, 4),
      plan.date_start.value.substr(5, 2) - 1,
      plan.date_start.value.substr(8, 2),
      plan.time_start.value.substr(0, 2),
      plan.time_start.value.substr(3, 2)
    );
    const time_end = new Date(
      plan.date_end.value.substr(0, 4),
      plan.date_end.value.substr(5, 2) - 1,
      plan.date_end.value.substr(8, 2),
      plan.time_end.value.substr(0, 2),
      plan.time_end.value.substr(3, 2)
    );
    let flag = 0;
    for (let i = 0; i < events.length; i++) {
      if (
        (time_start >= events[i].start && time_start < events[i].end) ||
        (time_end > events[i].start && time_end <= events[i].end) ||
        (time_start >= events[i].start && time_end <= events[i].end)
      ) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      //イベントの重複がなかったら
      calendar.addEvent({
        title: plan.title.value,
        start: plan.date_start.value + "T" + plan.time_start.value,
        end: plan.date_end.value + "T" + plan.time_end.value,
        editable: false,
        overlap: false,
      });
    } else {
      if (
        window.confirm(
          "他のイベントと一部重複していますが、イベントを追加しますか？"
        )
      ) {
        calendar.addEvent({
          title: plan.title.value,
          start: plan.date_start.value + "T" + plan.time_start.value,
          end: plan.date_end.value + "T" + plan.time_end.value,
          editable: false,
          overlap: false,
        });
      }
    }
  }
});
add_todo.addEventListener("click", function (e) {
  if (todo.title.value == "") {
    alert("タイトルを入力してください");
  } else if (todo.date.value == "") {
    alert("締め切り日を入力してください");
  } else if (todo.time.value == "") {
    alert("締め切り時間を入力してください");
  } else if (todo.len.value == "") {
    alert("予想時間を入力してください");
  } else if (todo.priority.value == "") {
    alert("優先度を入力してください");
  } else {
    const events = calendar.getEvents();
    //開始時間の昇順
    events.sort((a, b) => a.start - b.start);
    let time_start = new Date(
      GetDate.Year,
      GetDate.Month - 1,
      GetDate.Date,
      GetDate.Hour
    );
    time_start.setHours(time_start.getHours() + 1);
    let time_end = new Date(
      GetDate.Year,
      GetDate.Month - 1,
      GetDate.Date,
      GetDate.Hour
    );
    time_end.setHours(
      time_end.getHours() + Number(todo.len.value.substr(0, 2))
    );
    time_end.setMinutes(
      time_end.getMinutes() + Number(todo.len.value.substr(3, 2))
    );
    const deadline = new Date(
      todo.date.value.substr(0, 4),
      Number(todo.date.value.substr(5, 2)) - 1,
      todo.date.value.substr(8, 2),
      todo.time.value.substr(0, 2),
      todo.time.value.substr(3, 2)
    );
    if (time_start >= deadline) {
      alert("締め切り時間は今よりも後にしてください");
    } else {
      // 現段階のプログラムでは優先度にかかわらず、今の時間から締め切りまでにTodoを入れれたら入れるという感じ
      while (1) {
        let flag = 0;
        for (let i = 0; i < events.length; i++) {
          if (
            (time_start >= events[i].start && time_start < events[i].end) ||
            (time_end > events[i].start && time_end <= events[i].end) ||
            (time_start >= events[i].start && time_end <= events[i].end)
          ) {
            flag = 1;
            time_start = events[i].end;
            time_end = events[i].end;
            time_end.setHours(
              time_end.getHours() + Number(todo.len.value.substr(0, 2))
            );
            time_end.setMinutes(
              time_end.getMinutes() + Number(todo.len.value.substr(3, 2))
            );
            break;
          }
        }
        if (flag == 0) {
          break;
        }
        if (time_start >= deadline) {
          break;
        }
      }
      if (time_start >= deadline) {
        alert("締め切りまで忙しく、Todoを入れることができませんでした。");
      } else {
        calendar.addEvent({
          title: todo.title.value,
          start: time_start,
          end: time_end,
          editable: true,
          overlap: false,
        });
      }
    }
  }
});

//data send

const db = getFirestore(app);

//ここのtestuidのところにuserのuidを入れる
const userRef = doc(db, "userData", "testuid123412341234");
const docsnap = await getDoc(userRef);

const test_add_btn = document.getElementById("test_add");

document.getElementById("time").innerHTML = docsnap.data().予定;
document.getElementById("schedule").innerHTML = docsnap.data().時間;

test_add_btn.addEventListener("click", function () {
  console.log("hi");
  console.log(docsnap.data());
  setDoc(doc(db, "userData", "testuid13412451"), {
    name: "kang",
  });
});
