var gulp = require('gulp');
var bump = require('gulp-bump');
var mocha = require('gulp-mocha');
var git = require('gulp-git');
var pkg = require('./package.json');

/**
 * Test
 */
gulp.task('test', function() {
    return gulp.src('test/index.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});


/**
 * Bumping
 */
gulp.task('bump-patch', function() {
    return gulp.src('./package.json')
        .pipe(bump({type: 'patch'}))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function() {
    return gulp.src('./package.json')
        .pipe(bump({type: 'minor'}))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-major', function() {
    return gulp.src('./package.json')
        .pipe(bump({type: 'minor'}))
        .pipe(gulp.dest('./'));
});

/**
 * Git gestion
 */
gulp.task('git-tag', function() {
    return git.tag('v'+pkg.version, 'Version message', function (err) {
        if (err) throw err;
    });
});

gulp.task('git-commit-bump', function(){
    return gulp.src('./package.json')
        .pipe(git.commit('Update to v'+ pkg.version));
});

gulp.task('git-push-tag', function(){
    return git.push('origin', '', {args: '--tags'});
});

gulp.task('git-release', ['git-commit-bump', 'git-tag', 'git-push-tag']);

gulp.task('release-patch', ['bump-patch', 'git-release']);
gulp.task('release-minor', ['bump-minor', 'git-release']);
gulp.task('release-major', ['bump-major', 'git-release']);