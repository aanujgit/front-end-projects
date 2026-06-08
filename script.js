function animate(id,target){

    let count = 0;

    let interval = setInterval(()=>{

        count += Math.ceil(target/100);

        if(count >= target){

            count = target;

            clearInterval(interval);
        }

        document.getElementById(id).innerText =
        count + "+";

    },20);
}

animate("members",500);
animate("trainersCount",20);
animate("experience",10);

function calculateBMI(){

    let weight =
    document.getElementById("weight").value;

    let height =
    document.getElementById("height").value/100;

    let bmi =
    weight/(height*height);

    let status = "";

    if(bmi<18.5)
        status="Underweight";
    else if(bmi<25)
        status="Normal Weight";
    else if(bmi<30)
        status="Overweight";
    else
        status="Obese";

    document.getElementById("bmiResult")
    .innerHTML =
    "BMI : "
    + bmi.toFixed(2)
    + "<br>Status : "
    + status;
}
document.getElementById("registrationForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    let name =
    document.getElementById("name").value;

    document.getElementById("successMessage")
    .innerHTML =
    "✅ Congratulations <b>" +
    name +
    "</b>! Your registration has been successfully completed.";

    document.getElementById("successMessage")
    .style.display = "block";

    this.reset();
});
// Feedback handling
(function(){
  function qs(sel){ return document.querySelector(sel); }
  function qsa(sel){ return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  var form = qs('#feedbackForm');
  var starGroup = qs('#starGroup');
  var stars = qsa('#starGroup .star');
  var ratingInput = qs('#fbRating');
  var testimonials = qs('#testimonials');
  var STORAGE_KEY = 'fitzone_feedback_v1';

  function loadFeedback(){ 
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch(e){ return []; }
  }
  function saveFeedback(arr){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch(e){} }

  function renderTestimonials(){
    var data = loadFeedback().slice().reverse();
    testimonials.innerHTML = '';
    data.forEach(function(item, idx){
      var el = document.createElement('div');
      el.className = 'testimonial';
      el.innerHTML = '<strong>' + escapeHtml(item.name || 'Anonymous') + '</strong>'
                  + ' <span style="opacity:.6;font-size:13px;">(' + item.rating + '★)</span>'
                  + '<div style="margin-top:6px;">' + escapeHtml(item.message) + '</div>';
      testimonials.appendChild(el);
      // reveal animation
      setTimeout(function(){ el.classList.add('show'); }, 60 * idx + 80);
    });
    if (!data.length) {
      testimonials.innerHTML = '<div class="testimonial show">No feedback yet. Be the first to share your experience!</div>';
    }
  }

  function escapeHtml(s){ return (s+'').replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]); }); }

  // star interactions
  stars.forEach(function(st){
    st.addEventListener('mouseenter', function(){
      var v = Number(st.getAttribute('data-value'));
      stars.forEach(function(s){ s.classList.toggle('hover', Number(s.getAttribute('data-value')) <= v); });
    });
    st.addEventListener('mouseleave', function(){
      stars.forEach(function(s){ s.classList.remove('hover'); });
    });
    st.addEventListener('click', function(){
      var v = Number(st.getAttribute('data-value'));
      ratingInput.value = v;
      stars.forEach(function(s){ s.classList.toggle('selected', Number(s.getAttribute('data-value')) <= v); });
    });
  });

  // default selection
  (function(){ var v = Number(ratingInput.value || 5); stars.forEach(function(s){ s.classList.toggle('selected', Number(s.getAttribute('data-value')) <= v); }); })();

  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = (qs('#fbName').value || '').trim() || 'Anonymous';
      var email = (qs('#fbEmail').value || '').trim();
      var rating = Number(qs('#fbRating').value) || 5;
      var message = (qs('#fbMessage').value || '').trim();

      if (!message){
        alert('Please enter your feedback message.');
        return;
      }

      var arr = loadFeedback();
      arr.push({ name: name, email: email, rating: rating, message: message, ts: Date.now() });
      saveFeedback(arr);
      renderTestimonials();
      showToast('Thanks! Your feedback was submitted.');

      form.reset();
      ratingInput.value = 5;
      stars.forEach(function(s){ s.classList.toggle('selected', Number(s.getAttribute('data-value')) <= 5); });
    });
  }

  function showToast(msg){
    var t = document.createElement('div');
    t.className = 'toast-feedback';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function(){ t.style.opacity = '0'; t.style.transform = 'translateY(6px)'; }, 2200);
    setTimeout(function(){ t.remove(); }, 2800);
  }
})();