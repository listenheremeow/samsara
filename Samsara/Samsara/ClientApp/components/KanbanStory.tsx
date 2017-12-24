import * as React from 'react';
import 'isomorphic-fetch';

interface KanbanStoryProps {
    id: number;
    name: string;
    summary: string;
}

export class KanbanStory extends React.Component<KanbanStoryProps, {}> {
    public render() {
        return KanbanStory.renderKanbanStory(this.props.name, this.props.summary);
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