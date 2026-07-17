import fs from 'fs'
import posts0 from './old-posts-0.json' assert { type: "json" }
import posts1 from './old-posts-1.json' assert { type: "json" }

const excludePosts = [4517]
const firstPost = '{"ID":123456,"open":true,"slug":"photos-after-2019","date":"2019-12-31T14:56:01+03:00","title":"Kuvat vuoden 2019 jälkeen","content":"<p>Vuoden 2019 jälkeen järjestettyjen bileiden kuvat löydät <a href=\"https://www.facebook.com/infektio/photos_albums\" target=\"_blank\" rel=\"noreferrer\">Facebook kuvagallerioista</a> sekä <a href=\"https://samaelcreative.com/photo-archive/?_search_test=club+infektio\" target=\"_blank\" rel=\"noreferrer\">Samael Creativen sivuilta</a>.</p>\n"}'

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
        /* TODO: search and replace the following:
        (esim. fb:n automaattisesti tekemät rajaukset ovat ok)
        (Kuvia ei saa käyttää tekoälyn kouluttamiseen tai ladata generatiivisiin tekoälypalveluihin)

        (Automaattiset rajaukset, joita mm. FB tekee automaattisesti ovat ok)
        (Kuvia ei saa käyttää tekoälyn kouluttamiseen tai ladata generatiivisiin tekoälypalveluihin)

        (Automaattiset rajaukset, joita mm. FB tekee on ok)
        (Kuvia ei saa käyttää tekoälyn kouluttamiseen tai ladata generatiivisiin tekoälypalveluihin)

        (the automatic cropping done by eg. FB is ok)
        (These photos may not be used for AI training or be uploaded to generative AI services)

        vesileima säilytetään kuvassa.
        vesileima säilytetään kuvassa. Kuvia ei saa käyttää tekoälyn kouluttamiseen tai ladata generatiivisiin tekoälypalveluihin.

        watermark is not removed.
        watermark is not removed. These photos may not be used for AI training or be uploaded to generative AI services

        Kuvia saa käyttää sosiaalisissa medioissa
        Kuvia, joissa esiinnyt, saa käyttää sosiaalisissa medioissa

        Kuvia saa käyttää esimerkiksi
        Kuvia, joissa esiinnyt, saa käyttää esimerkiksi

        You may use these pictures in social media
        You may use the photos you appear in on social media

        You may use the pictures in social media
        You may use the photos you appear in on social media

        and the picture is not altered
        and the photo is not altered

        kunhan kuvan yhteyteen tulee maininta Infektiosta 🙂
        kunhan kuvan yhteyteen tulee maininta Infektiosta 🙂 (Kuvia ei saa käyttää tekoälyn kouluttamiseen tai ladata generatiivisiin tekoälypalveluihin)
        */
    }
}

function minifyPosts(postData) {
    return {
        posts: postData.posts
            .filter(post => !excludePosts.includes(post.ID))
            .map(extractFields)
    }
}

// TODO: add firstPost
fs.writeFileSync('./old-posts-0-minimal.json', JSON.stringify(minifyPosts(posts0)), 'utf8')
fs.writeFileSync('./old-posts-1-minimal.json', JSON.stringify(minifyPosts(posts1)), 'utf8')