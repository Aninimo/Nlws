import React from 'react';
import { ListDivider } from '../../components/ListDivider';

import {
    View,
    FlatList
} from 'react-native';

import { styles } from './styles';
import { GuildProps, Guild } from '../../components/Guild';
import { Load } from '../../components/Load';
import { useState } from 'react';
import { api } from '../../services/api';
import { useEffect } from 'react';

type Props = {
    handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect } : Props) {
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true)

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuilds();
    }, []);

    return (
        <View style={styles.container}>
            {
                loading ? <Load /> :
                <FlatList
                data={guilds}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Guild 
                        data={item}
                        onPress={() => handleGuildSelect(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 68, paddingTop: 104}}
                ItemSeparatorComponent={()=> <ListDivider isCentered />}
                style={styles.guilds}
                ListHeaderComponent={() => <ListDivider isCentered />}
                />
            }

        </View>
    );
}
