function htmlEntities(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function changeToSlug(e = '') {
  return (
    '@' +
    e
      .toLowerCase()
      .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
      .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
      .replace(/đ/gi, 'd')
      .replace(
        /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
        '',
      )
      .replace(/ /gi, '-')
      .replace(/&nbsp;/gi, '-')
      .replace(/\-\-\-\-\-/gi, '-')
      .replace(/\-\-\-\-/gi, '-')
      .replace(/\-\-\-/gi, '-')
      .replace(/\u00A0/g, '')
      .replace(/\-\-/gi, '-') +
    '@'
  ).replace(/\@\-|\-\@|\@/gi, '');
}
!(function (e) {
  'use strict';
  var t = function (t) {
      if ($('.toc-list').find('li').length > 0) {
        return;
      }
      return this.each(function () {
        var n,
          i,
          a = e(this),
          c = a.data(),
          r = [a],
          o = this.tagName,
          l = 0;
        (n = e.extend(
          {
            content: 'body',
            headings: 'h1,h2,h3',
          },
          {
            content: c.toc || void 0,
            headings: c.tocHeadings || void 0,
          },
          t,
        )),
          (i = n.headings.split(',')),
          e(n.content)
            .find(n.headings)
            .attr('id', function (t, n) {
              return (
                n ||
                (function (e) {
                  0 === e.length && (e = '?');
                  for (
                    var t = changeToSlug(e), n = '', i = 1;
                    null !== document.getElementById(t + n);

                  )
                    n = '_' + i++;
                  return t + n;
                })(e(this).text())
              );
            })
            .each(function () {
              var t = e(this),
                n = e.map(i, function (e, n) {
                  return t.is(e) ? n : void 0;
                })[0];
              if (n > l) {
                var a = r[0].children('li:last')[0];
                a && r.unshift(e('<' + o + '/>').appendTo(a));
              } else r.splice(0, Math.min(l - n, Math.max(r.length - 1, 0)));
              e('<li/>')
                .appendTo(r[0])
                .append(
                  e('<a/>')
                    .text(t.text())
                    .attr('data-rel', '#' + t.attr('id')),
                ),
                (l = n);
            });
      });
    },
    n = e.fn.toc;
  (e.fn.toc = t),
    (e.fn.toc.noConflict = function () {
      return (e.fn.toc = n), this;
    }),
    e(function () {
      t.call(e('[data-toc]'));
    });
})(window.jQuery);
