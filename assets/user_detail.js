// This will prevent the redirect of page

// This will save the data of post
let newPostForm=$('#post-form').submit(function(event){
    // preventDeafult prevents redirecting of page which prevent relod of page
    event.preventDefault();
    // No with help of ajax we create post without reloading
    $.ajax({
        url:"/post/create",
        type:"POST",
        data:newPostForm.serialize(),

        success:function(data){
            console.log(data)
            let addPost=PostAdd(data.data.post);
            $('#posts').prepend(addPost);
            deletePost($(' #del-but',addPost));
            $()
            new Noty({
                theme: 'sunset',
                text: "Post published!",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();
        },
        error:function(err){
            console.log(err.responseText);
        }

    })
})

function PostAdd(data){
    return $(`
    <div id="post-<%=i.id%>">
    <span>${data.content}</span>
    <br>
    <small>Posted by: ${data.user_id.name}</small>
    <br>
    <small>${data.time}</small>
    <small><a id ="#del-but" href="/post/delete/?id=${data._id}&user_id=${data.user_id._id}">Delete post</a></small>
    <form action="/comment/create" method="post">
        <input type="text" name="content" placeholder="Comment" required>
        <input type="hidden" name="post_id" value="${data._id}">
        <button type="submit">Comment</button>
    </form>
    <a href="/comment/show/?post_id=${data._id}"><button>Show Comments</button></a>
    <br><br>
    </div>
    `
    )
}

// To delete Post
let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                $(`#post-${data.data.id}`).remove();
                new Noty({
                    theme: 'relax',
                    text: "Post Deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },error: function(error){
                console.log(error.responseText);
            }
        });

    });
}
