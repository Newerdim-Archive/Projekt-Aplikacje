var checkInputs = function () {
  var inputs = document.querySelectorAll("input, textarea, select");
  inputs === null || inputs === void 0
    ? void 0
    : inputs.forEach(function (el) {
        if (el.type === "checkbox") {
          return;
        }
        // Add class acrive if input has value
        if (el.value !== "") {
          el.classList.add("active");
          el.parentElement.classList.add("active");
        } else {
          el.classList.remove("active");
          el.parentElement.classList.remove("active");
        }
        // Add class acrive if input changed and has value
        el.addEventListener("change", function (ev) {
          var _a, _b;
          var target = ev.target;
          if (target.value) {
            target.classList.add("active");
            (_a = target.parentElement) === null || _a === void 0
              ? void 0
              : _a.classList.add("active");
          } else {
            target.classList.remove("active");
            (_b = target.parentElement) === null || _b === void 0
              ? void 0
              : _b.classList.remove("active");
          }
        });
      });
  var checkmarks = document.querySelectorAll(
    ".checkbox-container, .radio-container, a"
  );
  // Add tabindex (can be focuesd) to all checkboxes and radios
  checkmarks.forEach(function (el) {
    el.setAttribute("tabindex", "0");
  });
};
var initialNav = function () {
  var closeNavButtons = document.querySelectorAll(".close-nav");
  var openNavButtons = document.querySelectorAll(".open-nav");
  closeNavButtons === null || closeNavButtons === void 0
    ? void 0
    : closeNavButtons.forEach(function (button) {
        return button.addEventListener("click", function () {
          closeNavT();
        });
      });
  openNavButtons === null || openNavButtons === void 0
    ? void 0
    : openNavButtons.forEach(function (button) {
        return button.addEventListener("click", function () {
          openNavT();
        });
      });
};
var closeNav = function () {
  var _a, _b, _c;
  (_a = document.querySelector("#nav")) === null || _a === void 0
    ? void 0
    : _a.classList.remove("active");
  (_b = document.querySelector(".close-nav")) === null || _b === void 0
    ? void 0
    : _b.classList.remove("active");
  (_c = document.querySelector(".open-nav")) === null || _c === void 0
    ? void 0
    : _c.classList.add("active");
};
var openNav = function () {
  var _a, _b, _c;
  (_a = document.querySelector("#nav")) === null || _a === void 0
    ? void 0
    : _a.classList.add("active");
  (_b = document.querySelector(".close-nav")) === null || _b === void 0
    ? void 0
    : _b.classList.add("active");
  (_c = document.querySelector(".open-nav")) === null || _c === void 0
    ? void 0
    : _c.classList.remove("active");
};
// const initialCurtains = () => {
//   const curtains = document.querySelectorAll('.curtain');
//   curtains?.forEach((el) => {
//     el.addEventListener('click', (ev) => {
//       const parent = (ev.target as HTMLElement).parentElement;
//       parent.classList.remove('active');
//     });
//   });
// };
