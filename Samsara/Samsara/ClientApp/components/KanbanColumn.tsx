import * as React from 'react';
import { KanbanStory } from './KanbanStory';
import 'isomorphic-fetch';

interface KanbanColumnProps {
    id: number;
}

interface KanbanColumnExampleState {
    stories: Story[];
    loading: boolean;
}

export class KanbanColumn extends React.Component<KanbanColumnProps, KanbanColumnExampleState> {
    constructor() {
        super();
        this.state = { stories: [], loading: true };

        fetch('api/Kanban/Stories')
            .then(response => response.json() as Promise<Story[]>)
            .then(data => {
                this.setState({ stories: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : KanbanColumn.renderKanbanColumn(this.props.id, this.state.stories);

        return contents;
    }

    private static renderKanbanColumn(id: number, stories: Story[]) {
        return <td>
            {stories.map(story => <KanbanStory id={story.id} name={story.name} summary={story.summary} />)}
        </td>;
    }
}

interface Story {
    id: number;
    name: string;
    summary: string;
}