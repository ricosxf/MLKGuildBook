// JavaScript Document
(function ($) {
    $.fn.extend({
        insertAtCaret: function (myValue) {
            var $t = $(this)[0];
            if (document.selection) {
                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            }
            else if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
            }
            else {
                this.value += myValue;
                this.focus();
            }
        }
    })
})(jQuery);
(function ($) {
    $.fn.extend({
        insertBA: function (before, after) {
            var $t = $(this)[0];
            if (document.selection) {
                return;
            }
            else if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + before + $t.value.substring(startPos, endPos) + after + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + before.length;
                $t.selectionEnd = startPos + after.length;
                $t.scrollTop = scrollTop;
            }
            else {
                this.value += before + after;
                this.focus();
            }
        }
    })
})(jQuery);