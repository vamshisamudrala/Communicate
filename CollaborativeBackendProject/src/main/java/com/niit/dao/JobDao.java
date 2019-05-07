package com.niit.dao;

import java.util.List;

import com.niit.models.Job;

public interface JobDao {
void addJob(Job job);
List <Job> getAllJobs();
void deleteJob(int id);
Job getJob(int id);
void updateJob(Job job);
}
