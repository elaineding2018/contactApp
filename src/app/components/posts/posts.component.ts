import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  
  posts: Post[];

  currentPost: Post = {
      id: 0,
      name: '',
      firstName:'',
      lastName:'',
      phone:'',
      isActive: true,
      email:''  
    }
  isEdit: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit() {  
    this.postService.getPosts().subscribe(posts => {
      posts.forEach((cur, index) => {
          cur.isActive = true;     // hard code 2 fields which is not in sample api data , by default user is active
          cur.status = "Active";
      });
      this.posts = posts;
    });

  }

  onNewPost(post: Post) {
  
    this.currentPost = {
        id: -1,
        name: '',
        firstName:'',
        lastName:'',
        phone:'',
        isActive: false,
        status: "Inactive",
        email:''  
      }
    
      if(!post.id || post.id == -1){
        //this id should be return from database. since we use sample date to mimic post, hard code id here.
        post.id = this.posts.length;
      }  

    this.posts.unshift(post);
    
  }

  editPost(post: Post) {
    this.currentPost = post;
    if (!this.currentPost.firstName){
      var res = post.name.split(" ");
      this.currentPost.firstName = res[0];
      this.currentPost.lastName = res[1];
    }
    this.isEdit = true;
  }

  onUpdatedPost(post: Post) {
    this.posts.forEach((cur, index) => {
      //alert("upate post.....");
      if(post.id === cur.id) {
        console.log(post.id);
        this.posts.splice(index, 1);
        this.posts.unshift(post);
        this.isEdit = false;
        this.currentPost = {
          id: -1,
          name: '',
          firstName:'',
          lastName:'',
          phone:'',
          isActive: false,
          email:''  
        }
      }
    });
  }

  removePost(post: Post) {
    if(confirm('Are You Sure?')) {
      this.posts.forEach((cur, index) => {
        if(post.id === cur.id) {
          this.posts.splice(index, 1);  
        }
      });
     /*  this.postService.removePost(post.id).subscribe(() => {
        this.posts.forEach((cur, index) => {
          if(post.id === cur.id) {
            this.posts.splice(index, 1);  
          }
        });
      }); */
    }
  }

}
