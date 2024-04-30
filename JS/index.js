// 导航实例
const headerEl = document.querySelector("header");
// 返回顶部实例
const scrollToTop = document.querySelector(".scrollToTop");

// 窗口滚动处理
window.addEventListener("scroll", () => {
  // 固定导航
  let height = headerEl.getBoundingClientRect().height;

  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }

  // 显示返回顶部
  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

// 初始轮播
const glide = new Glide(".glide");
// 获取轮播标题实例
const captionsEl = document.querySelectorAll(".slide-caption");
// 当轮播加载完成后，每个轮播完成时，加载标题动画
glide.on(["mount.after", "run.after"], () => {
  // 获取当前展示的轮播index
  const caption = captionsEl[glide.index];
  anime({
    // 对每个子元素进行动画
    targets: caption.children,
    // 透明度
    opacity: [0, 1],
    // 持续时间
    duration: 400,
    easing: "linear",
    // 每个子元素相继延迟400毫秒，第一个延迟300毫秒
    delay: anime.stagger(400, { start: 300 }),
    // 从下向上移动，每行从40到10递减，最后移动到0
    translateY: [anime.stagger([40, 10]), 0]
  });
});

// 轮播进行前，把标题透明度设置为0，还原
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach(el => {
    el.style.opacity = 0;
  });
});

// 加载轮播，必须在添加事件处理函数之后
glide.mount();

// 成功案例
// 初始化isotope
const isotope = new Isotope(".cases", {
  // 适应行布局，每行宽度一样
  layoutMode: "fitRows",
  // 每个案例的class选择器
  itemSelector: ".case-item"
  // percentPosition: true
});

// 成功案例筛选
const filterBtns = document.querySelector(".filter-btns");
// 当点击筛选按钮时
filterBtns.addEventListener("click", e => {
  let { target = {} } = e;
  const filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    // 取消其他按钮active状态
    document
      .querySelectorAll(".filter-btn.active")
      .forEach(btn => btn.classList.remove("active"));
    target.classList.add("active");
    // 筛选
    isotope.arrange({ filter: filterOption });
  }
});

// 滚动展示插件
// 通用动画配置，从底部50象素滑出来
const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom"
};
// 滚动到业务流程时的展示动画，interval需要单独设置，每个feature元素相继350毫秒，下同
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 });

// 数据部分
const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    // 在展示之前，加载anime动画，使数据从0增长到定义好的数值
    anime({
      targets: ".data-piece .num",
      innerHTML: el => {
        return [0, el.innerHTML];
      },
      duration: 2000,
      round: 1,
      easing: "easeInExpo"
    });
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect()
      .bottom / 5}px)`;
  }
});
// 数据，背景视差滚动
window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect().top;
  // 如果在可见区域内
  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom /
      5}px)`;
  }
});

/* ***** 响应式**** */

// 折叠按钮
const burgerEl = document.querySelector(".burger");
const nav = document.querySelector("header nav");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});

// 流畅滚动
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
  // 自动计算固定导航的高度
  header: "header",
  // 偏移80象素
  offset: 80
});

// 探索更多按钮的处理函数
const exploreBtnEl = document.querySelector(".explore-btn");
exploreBtnEl.addEventListener("click", () => {
  scroll.animateScroll(document.querySelector("#introduction"));
});

// 折叠菜单打开时，如果点击了链接，则自动关闭全屏导航
document.addEventListener("scrollStart", () => {
  if (headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});






var query = window.matchMedia("(min-width: 768px)");

// Typing the header of homepage
var i1 = 0;
var i2 = 0;
var i3 = 0;
var txt1 = "What if we could recycle plastic waste into something useful?     ";
var txt2 = "      food?";
var speed = 50;
const delete_len = 22;
const type = () => {
  const type_elem = document.getElementById("reflect-text");
  const head_img = document.getElementById("head-img");
  if (type_elem && head_img) {
    function typeWriter() {
      if (i1 < txt1.length) {
        type_elem.innerHTML += txt1.charAt(i1);
        i1++;
      }
      if (i1 == txt1.length && i2 < delete_len) {
        type_elem.innerHTML = type_elem.innerHTML.slice(0, -1);
        i2++;
      }
      if (i2 == delete_len && i3 < txt2.length) {
        type_elem.innerHTML += txt2.charAt(i3);
        i3++;
      }
      setTimeout(typeWriter, speed);
    }
    typeWriter();
  }
};

var head_img = document.querySelector("#head-img");
if (head_img) {
  var navbar = document.querySelector(".navbar");
  navbar.style.backgroundColor = "black";
  if (head_img.complete) {
    type();
  } else {
    // head_img.addEventListener("canplay", type, false);
    head_img.addEventListener("load", type, false);
  }
  var dropdowns = document.querySelectorAll(".dropdown-menu");
  dropdowns.forEach((i) => {
    i.style.backgroundColor = "black";
  });
}

// Number increment on homepage
const totalTime = 2000;
const num1 = 400;
const num2 = 8;
const num3 = 100;
var called1 = false;
var called2 = false;
var called3 = false;

const increment1 = () => {
  const num = document.querySelector("#num1");
  if (num) {
    const i = parseInt(num.innerHTML);
    if (i < num1) {
      num.innerHTML = String(i + 4);
      setTimeout(increment1, totalTime / (num1 / 2));
    }
  }
};
const increment2 = () => {
  const num = document.querySelector("#num2");
  if (num) {
    const i = parseInt(num.innerHTML);
    if (i < num2) {
      num.innerHTML = String(i + 1);
      setTimeout(increment2, totalTime / (num2 * 1.2));
    }
  }
};
const increment3 = () => {
  const num = document.querySelector("#num3");
  if (num) {
    const i = parseInt(num.innerHTML);
    if (i < num3) {
      num.innerHTML = String(i + 2);
      setTimeout(increment3, totalTime / (num3 / 1.5));
    }
  }
};

const callback = () => {
  const num1 = document.querySelector("#num1");
  const num2 = document.querySelector("#num2");
  const num3 = document.querySelector("#num3");
  if (num1 && num1.getBoundingClientRect().bottom < screen_h && !called1) {
    increment1();
    called1 = true;
  }
  if (num2 && num2.getBoundingClientRect().bottom < screen_h && !called2) {
    increment2();
    called2 = true;
  }
  if (num3 && num3.getBoundingClientRect().bottom < screen_h && !called3) {
    increment3();
    called3 = true;
  }
};

document.addEventListener("scroll", callback);

const scale = (entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("scaleToNormal");
    } else {
      e.target.classList.remove("scaleToNormal");
    }
  });
};
const scaleNormalObserver = new IntersectionObserver(scale);
const numbers = document.querySelectorAll(".problem-im-text");
if (numbers) {
  numbers.forEach((n) => scaleNormalObserver.observe(n));
}

const screen_h = window.innerHeight;
const vh = screen_h / 100;
const vw = window.innerWidth / 100;

// Fall to flask animation
const pieces = document.querySelector("#plastic");
const tpaeg = document.querySelector("#tpaeg");
const flask = document.querySelector("#flask");
const cog = document.querySelector("#cog");

const fall_to_flask = (e) => {
  const bottom = cog.getBoundingClientRect().bottom;
  const scrolled = screen_h - bottom;
  const avail = 10 * vh;
  const acc = (1 - 0.15) / avail;
  const avail1 = 16 * vh;
  const pieces_scale =
    1 - scrolled * acc > 0 ? Math.min(1 - scrolled * acc, 1) : 0;
  pieces.style.scale = pieces_scale;
  if (scrolled > avail && scrolled <= avail + avail1) {
    var rotate_acc;
    if (scrolled <= avail + avail1 / 4) {
      rotate_acc = -10 / (avail1 / 4);
      flask.style.rotate = (scrolled - avail) * rotate_acc + "deg";
    } else if (scrolled <= avail + (avail1 * 3) / 4) {
      rotate_acc = 20 / (avail1 / 2);
      flask.style.rotate =
        -10 + (scrolled - (avail + avail1 / 4)) * rotate_acc + "deg";
    } else {
      rotate_acc = -10 / (avail1 / 4);
      flask.style.rotate =
        10 + (scrolled - (avail + (avail1 * 3) / 4)) * rotate_acc + "deg";
    }
  } else {
    flask.style.rotate = "0deg";
  }
  if (scrolled > avail + avail1) {
    const tpaeg_scale = Math.min((scrolled - (avail + avail1)) * acc + 0.15, 1);
    tpaeg.style.scale = tpaeg_scale;
  } else {
    tpaeg.style.scale = 0.15;
  }
};

if (pieces && tpaeg && flask && cog) {
  document.addEventListener("scroll", fall_to_flask);
}

// Cultivate bacteria animation
const bacteria_a = document.querySelector("#bact-after");
const tpa_eg = document.querySelector("#tpa-eg");
const protein = document.querySelector("#protein");
const cultivate = (e) => {
  const bottom = tpa_eg.getBoundingClientRect().bottom;
  const scrolled = screen_h - bottom;
  const avail = 12 * vh;
  const acc = 1 / avail;
  const opa = 1 - acc * scrolled;
  tpa_eg.style.opacity = opa > 0 ? Math.min(opa, 1) : 0;
  const opa_bact = (scrolled - avail) * acc;
  bacteria_a.style.opacity = opa_bact > 0 ? Math.min(opa_bact, 1) : 0;
  const opa_prt = (scrolled - avail * 2) * acc;
  protein.style.opacity = opa_prt > 0 ? Math.min(opa_prt, 1) : 0;
};
if (bacteria_a && tpa_eg && protein) {
  document.addEventListener("scroll", cultivate);
}

// Fade in animation
const observerFadeIn = new IntersectionObserver(
  (items) => {
    items.forEach((i) => {
      if (i.isIntersecting) {
        i.target.classList.add("fade-in");
      } else {
        i.target.classList.remove("fade-in");
      }
    });
  },
  {
    threshold: 1,
  }
);

const fadeInItems = document.querySelectorAll(".to-fade-in");
fadeInItems.forEach((i) => {
  observerFadeIn.observe(i);
});

const observerFadeInFast = new IntersectionObserver(
  (items) => {
    items.forEach((i) => {
      if (i.isIntersecting) {
        i.target.classList.add("fade-in");
      } else {
        i.target.classList.remove("fade-in");
      }
    });
  },
  {
    threshold: 0.5,
  }
);

const fadeInFastItems = document.querySelectorAll(".to-fade-in-fast");
fadeInFastItems.forEach((i) => {
  observerFadeInFast.observe(i);
});

// Slide in observer

const observerSlideIn = new IntersectionObserver(
  (entries) => {
    entries.forEach((i) => {
      if (i.isIntersecting) {
        i.target.classList.add("slide-in");
        // } else {
        //   i.target.classList.remove("slide-in");
      }
    });
  },
  {
    threshold: 0.5,
  }
);
const toSlideLeft = document.querySelectorAll(".to-slide-left");
const toSlideRight = document.querySelectorAll(".to-slide-right");
if (toSlideLeft) {
  toSlideLeft.forEach((i) => {
    observerSlideIn.observe(i);
  });
}
if (toSlideRight) {
  toSlideRight.forEach((i) => {
    observerSlideIn.observe(i);
  });
}

// Table of content and scroll to section

const scrollHeight = document.documentElement.scrollHeight;
const clientHeight = document.documentElement.clientHeight;
const tocsections = document.querySelectorAll(".toc-section");
const toclinks = document.querySelectorAll(".toc");
const scrollToSec = () => {
  tocsections.forEach((s) => {
    const scroll = scrollY + 200;
    const offset = s.offsetTop;
    const height = s.offsetHeight;
    if (scroll > offset && scroll < offset + height) {
      toclinks.forEach((l) => {
        if (l.getAttribute("href").includes(s.getAttribute("id"))) {
          l.classList.add("sidenav-active");
        } else {
          l.classList.remove("sidenav-active");
        }
      });
    }
  });
};
const clickScroll = (e) => {
  e.preventDefault();
  const link = e.target;
  const item = document.querySelector(link.getAttribute("href"));
  const height = item.offsetTop;
  window.scroll(0, height - 150);
};
if (tocsections && toclinks) {
  scrollToSec();
  document.addEventListener("scroll", scrollToSec);
  toclinks.forEach((l) => {
    l.addEventListener("click", clickScroll);
  });
}
const progressbar = document.querySelector("#progressbar");
const progressBar = () => {
  const percentage = (scrollY / (scrollHeight - clientHeight)) * 100;
  progressbar.style.width = percentage + "%";
};
document.addEventListener("scroll", progressBar);



var toc_pages = document.querySelectorAll(".toc-page");
if (toc_pages) {
  toc_pages.forEach((t) =>
    t.addEventListener("click", (e) => {
      e.preventDefault();
      toc_pages.forEach((p) => {
        p.classList.remove("is-active");
      });
      t.classList.add("is-active");
      var href = t.getAttribute("href");
      var sections = document.querySelectorAll(".toc-section");
      sections.forEach((s) => {
        var id = s.getAttribute("id");
        if (!href.includes(id)) {
          s.style.display = "none";
        } else {
          s.style.display = "flex";
          const height = s.offsetTop;
          window.scroll(0, height - 150);
        }
      });
    })
  );
}

var nav_buttons = document.querySelectorAll(".nav-button");
if (nav_buttons) {
  nav_buttons.forEach((b) => {
    b.addEventListener("click", (e) => {
      var target_id = b.getAttribute("go-to");
      var sections = document.querySelectorAll(".toc-section");
      sections.forEach((s) => {
        var id = s.getAttribute("id");
        if (id != target_id) {
          s.style.display = "none";
        } else {
          s.style.display = "flex";
          const height = s.offsetTop;
          window.scroll(0, height - 150);
        }
      });
      var toc_pages = document.querySelectorAll(".toc-page");
      toc_pages.forEach((t) => {
        var href = t.getAttribute("href");
        if (!href.includes(target_id)) {
          t.classList.remove("is-active");
        } else {
          t.classList.add("is-active");
        }
      });
    });
  });
}


function showText(buttonNumber) {
  // 先隐藏所有文字段落
  document.getElementById('text1').style.display = 'none';
  document.getElementById('text2').style.display = 'none';
  document.getElementById('text3').style.display = 'none';


  // 根据按键编号显示相应的文字段落
  document.getElementById('text' + buttonNumber).style.display = 'block';

  // 获取所有按钮元素
  var buttons = document.querySelectorAll('.button');

  // 移除所有按钮的红色样式
  buttons.forEach(function (button) {
    button.classList.remove('red');
  });

  // 给点击的按钮添加红色样式
  buttons[index].classList.add('red');
}
