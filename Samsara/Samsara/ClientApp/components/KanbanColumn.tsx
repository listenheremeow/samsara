import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { KanbanStory } from './KanbanStory';
import 'isomorphic-fetch';

interface KanbanColumnProps {
    name: string;
}

interface KanbanColumnExampleState {
    stories: number[];
    loading: boolean;
}

export class KanbanColumn extends React.Component<KanbanColumnProps, KanbanColumnExampleState> {
    constructor() {
        super();
        this.state = { stories: [], loading: true };

        fetch('api/Kanban/Stories')
            .then(response => response.json() as Promise<number[]>)
            .then(data => {
                this.setState({ stories: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : KanbanColumn.renderKanbanColumn(this.props.name, this.state.stories);

        return contents;
    }

    private static renderKanbanColumn(name: string, stories: number[]) {
        return <td>
            {stories.map(story => <KanbanStory id={story} />)}
        </td>;
    }
}