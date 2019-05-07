package com.niit.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="BLOGPOST")
public class BlogPost {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
private int blogPostId;
private String blogTitle;
@Lob
private String blogContent;
private Date postedOn;
@ManyToOne
private User postedBy;
private boolean approved;
private int  likes;
public int getLikes() {
	return likes;
}
public void setLikes(int likes) {
	this.likes = likes;
}
public int getBlogPostId() {
	return blogPostId;
}
public void setBlogPostId(int blogPostId) {
	this.blogPostId = blogPostId;
}
public String getBlogTitle() {
	return blogTitle;
}
public void setBlogTitle(String blogTitle) {
	this.blogTitle = blogTitle;
}
public String getBlogContent() {
	return blogContent;
}
public void setBlogContent(String blogContent) {
	this.blogContent = blogContent;
}
public Date getPostedOn() {
	return postedOn;
}
public void setPostedOn(Date postedOn) {
	this.postedOn = postedOn;
}
public User getPostedBy() {
	return postedBy;
}
public void setPostedBy(User postedBy) {
	this.postedBy = postedBy;
}
public boolean isApproved() {
	return approved;
}
public void setApproved(boolean approved) {
	this.approved = approved;
}

}
