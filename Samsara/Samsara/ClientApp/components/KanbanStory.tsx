import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface KanbanStoryProps {
    id: number;
}

interface KanbanColumnExampleState {
    details: StoryDetails;
    loading: boolean;
}

export class KanbanStory extends React.Component<KanbanStoryProps, KanbanColumnExampleState> {
    constructor(props: KanbanStoryProps) {
        super(props);

        var emptyDetails: StoryDetails = {
            name: '',
            summary: ''
        }

        this.state = { details: emptyDetails, loading: true };
        fetch(`api/Kanban/StoryDetails/${this.props.id}`)
            .then(response => response.json() as Promise<StoryDetails>)
            .then(data => {
                this.setState({ details: data, loading: false });
            });
    }

    public render() {
        return KanbanStory.renderKanbanStory(this.state.details.name, this.state.details.summary);
    }

    private static renderKanbanStory(name: string, summary: string) {
        return <div className='story'>
            <h4>{name}</h4>
            <p>
                {summary}
            </p>
        </div>;
    }
}

interface StoryDetails {
    name: string;
    summary: string;
}