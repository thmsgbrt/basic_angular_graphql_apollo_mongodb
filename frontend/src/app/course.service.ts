import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, filter } from 'rxjs/operators';

import { Query, Course } from './types';

@Injectable()
export class CourseService {

  constructor(private apollo: Apollo) { }

  getAllCourses(searchTerm: String) {
    return this.apollo.watchQuery<Query>({
      pollInterval: 500,
      query: gql`
        query allCourses($searchTerm: String) {
          allCourses(searchTerm: $searchTerm) {
            id
            title
            author
            description
            topic
            url
            voteCount
          }
        }
      `,
      variables: {
        searchTerm: searchTerm
      }
    })
      .valueChanges
      .pipe(
        map(result => result.data.allCourses)
      );
  }

  upvoteCourse(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation upvote($id: String!) {
          upvote(id: $id) {
            id
            title
            voteCount
          }
        }
      `,
      variables: {
        id: id
      }
    });
  }

  downvoteCourse(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation downvote($id: String!) {
          downvote(id: $id) {
            id
            title
            voteCount
          }
        }
      `,
      variables: {
        id: id
      }
    });
  }

}
