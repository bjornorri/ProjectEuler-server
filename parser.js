function split_first(txt, del) {
  var idx = txt.indexOf(del);
  return [ txt.substring(0, idx), txt.substring(idx + del.length) ];
}

function split_n(txt, del, n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    var nxt = split_first(txt, del);
    arr.push(nxt[0]);
    txt = nxt[1];
  }
  arr.push(txt);
  return arr;
}

module.exports = {
  parseProblems: function(data) {
    var problems = [];
    var sp = data.split('<div style="page-break-inside:avoid;"><div class="info"><h3>');
    for (var i = 1; i < sp.length; i++) {
      var content = sp[i];
      content = content.split('</div></div>')[0];
      content = split_first(content, 'Problem ')[1];
      content = split_first(content, '<span');
      var title = content[0];
      content = content[1];
      title = split_first(title, ':');
      var problem_id = title[0];
      title = title[1];
      problem_id = parseInt(problem_id.trim(), 10);
      title = title.trim();
      content = split_first(content, '>')[1];
      content = split_first(content, '</span>');
      var metadata = content[0];
      content = content[1];
      metadata = metadata.split(';');
      var difficulty = null;
      var published = metadata[0];
      published = split_first(published, ', ')[1];
      var solved_by_count = metadata[1].split(' ');
      solved_by_count = parseInt(solved_by_count[solved_by_count.length - 1], 10);
      if (metadata.length >= 3) {
        difficulty = metadata[2].trim();
        difficulty = parseInt(split_n(difficulty, ' ', 2)[2].split('%')[0], 10) / 100.0;
      }
      var statement = split_first(content, 'class="problem_content">')[1];
      problems.push({
        'id': problem_id,
        'title': title, // NOTE: this is HTML
        'statement': '<div class="problem_content">' + statement + '</div>',
        'published': published,
        'solved_by_count': solved_by_count,
        'difficulty': difficulty
      });
    }
    return problems;
  }
}
