import fs from 'fs'
import posts0 from './old-posts-0.json' assert { type: "json" }
import posts1 from './old-posts-1.json' assert { type: "json" }

const excludePosts = [4517]

function extractFields(post) {
    return {
        ID: post.ID,
        slug: post.slug,
        date: post.date,
        title: post.title,
        content: post.content
            .replace(/data-[^"\s]+"[^"]*"(\s)?/ig, '')
            .replace(/<div[^<>]*style="float:left;width:100%;height:\d*px;overflow:hidden;"[^<>]*>/ig, '<div class="deleted">')
            .replace(/style="[^"]*"/ig, '')
            .replace(/href=["']https?:\/\/clubinfektio\.com[^"']*["']/ig, '')
            .replace(/href=["'](https?:\/\/infektio\.(files\.)?wordpress\.com[^"']*)["']/ig, '')
            .replace(/http:\/\/clubinfektio\.com/ig, 'https://clubinfektio.com')
            .replace(/http:\/\/infektio\.files\.wordpress\.com/ig, 'https://infektio.files.wordpress.com')
            .replace(/http:\/\/infektio\.wordpress\.com/ig, 'https://infektio.wordpress.com')
            .replace(/<img/ig, '<img loading="lazy"')
            .replace(/src="([^"]+\.(jpe?g|png|webp))"/ig, 'src="$1?w=1600&h=1200"')
    }
}

function minifyPosts(postData) {
    return {
        posts: postData.posts
            .filter(post => !excludePosts.includes(post.ID))
            .map(extractFields)
    }
}

fs.writeFileSync('./old-posts-0-minimal.json', JSON.stringify(minifyPosts(posts0)), 'utf8')
fs.writeFileSync('./old-posts-1-minimal.json', JSON.stringify(minifyPosts(posts1)), 'utf8')